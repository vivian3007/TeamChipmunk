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
    console.log(isMatch)
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    firstCard.removeEventListener('keydown', handleKeyDown);
    secondCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('keydown', handleKeyDown);

    matchedPairs++;
    console.log(matchedPairs)
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            window.location.href = 'doel_behaald.html';
        }, 800);
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
    cards.forEach((card, index) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

        card.setAttribute("tabindex", randomPos); //TODO: niet bij de laatste kaart beginnen????
    });
})();

cards.forEach(card => {card.addEventListener('click', flipCard); card.addEventListener('keydown', handleKeyDown)});

