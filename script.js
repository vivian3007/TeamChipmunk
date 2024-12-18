document.addEventListener("DOMContentLoaded", function() {
    const main = document.getElementById("main");
    if (main) {
        main.tabIndex = -1;
        main.focus();
    }
});


const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cards.length / 2;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    const cardType = this.dataset.card;
    const audio = new Audio(`includes/${cardType}.mp3`);
    audio.play();

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    firstCard.removeEventListener('keydown', handleKeyDown);
    secondCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('keydown', handleKeyDown);

    matchedPairs++;
    if (matchedPairs === totalPairs) {
        const audio = new Audio(`includes/Trumpet.mp3`);
        audio.play();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        flipCard.call(this);
    }
}

(function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        console.log(randomPos)
        card.style.order = randomPos;

        card.setAttribute("tabindex", randomPos); //TODO: tab werkt niet goed????
        //test
    });
})();

cards.forEach(card => {card.addEventListener('click', flipCard); card.addEventListener('keydown', handleKeyDown)});

