/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')

        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
}
showMenu('nav-toggle', 'nav-menu');


/*=============== GENERATE CARD ===============*/
const generateCard = () => {
    const getLocalStorageData = localStorage.getItem("available_cards");

    if (JSON.parse(getLocalStorageData).length == 0) {
        const cardCategory = document.getElementById("card-category");
        const cardQuestion = document.getElementById("card-question");
        const cardImage = document.getElementById("card-image");

        cardCategory.innerHTML = 'Tidak ada kartu yang tersisa!:(';
        cardQuestion.innerHTML = 'Harap refresh halaman web untuk memulai ulang permainan!';
        cardImage.src = 'img/default.webp';
    } else {
        const cards = JSON.parse(getLocalStorageData);
        const randomIndex = Math.floor(cards.length * Math.random());

        showCard(cards, cards[randomIndex], randomIndex);
    }
}

/*=============== SHOW THE CARD TO THE PAGE ===============*/
const showCard = (cards, card, index) => {
    const cardTotal = document.getElementById("card-total");
    const cardImage = document.getElementById("card-image");
    const cardCategory = document.getElementById("card-category");
    const cardQuestion = document.getElementById("card-question");

    randomCardAnimation();

    setTimeout(function(){
        cardImage.src = 'img/' + card.img;
        cardTotal.innerHTML = cards.length + '/60';
        cardCategory.innerHTML = card.category;
        cardQuestion.innerHTML = card.question;
    }, 4500);

    // Delete the card after opened
    cards.splice(index, 1);
    localStorage.setItem("available_cards", JSON.stringify(cards));
}

/*=============== ADD ANIMATION TO THE CARD ===============*/
const randomCardAnimation = () => {
    const cardImage = document.getElementById("card-image");
    const cardSrc = ['1-category.webp', '2-category.webp', '3-category.webp', '4-category.webp', '5-category.webp', '6-category.webp', '7-category.webp'];

    const cardCategory = document.getElementById("card-category");
    const cardQuestion = document.getElementById("card-question");

    cardCategory.innerHTML = '';
    cardQuestion.innerHTML = '';

    const startTime = new Date().getTime();
    setInterval(function () {
        let i = Math.floor(cardSrc.length * Math.random());

        if(new Date().getTime() - startTime > 4500){
            clearInterval;
            return;
        }

        cardImage.setAttribute('src', 'img/'+ cardSrc[i]);
    }, 140);
}

/*=============== GET ALL CARDS AND SAVE THEM TO LOCAL STORAGE ===============*/
const getCards = () => {
    fetch("cards.json")
    .then(data => data.json())
    .then(data => {
        let getLocalStorageData = localStorage.getItem("available_cards");

        if (getLocalStorageData == null || JSON.parse(getLocalStorageData).length == 0) {
            cards = data;
        } else {
            cards = JSON.parse(getLocalStorageData);
        }

        const cardTotal = document.getElementById("card-total");
        cardTotal.innerHTML = cards.length + '/60';

        localStorage.setItem("available_cards", JSON.stringify(cards));
    });
};

/*=============== RESET AVAILABLE CARDS FROM LOCAL STORAGE ===============*/
const resetCards = () => {
    let confirmText = "Apakah Anda yakin untuk mengulangi permainan?";
    if (confirm(confirmText)) {
        fetch("cards.json")
        .then(data => data.json())
        .then(data => {
            const cards = data;
            const cardTotal = document.getElementById("card-total");
            cardTotal.innerHTML = cards.length + '/60';

            localStorage.setItem("available_cards", JSON.stringify(cards));
        });
    }
}

window.addEventListener("load", getCards);
