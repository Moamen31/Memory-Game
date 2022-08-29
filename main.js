const cards = document.querySelectorAll(".card")

let isFlipped = false;
let cardOne, cardTwo;
let lockBoard = false

function flipCard() {
    if (lockBoard) { // if it's true lock the board
        return;
    }
    if (this === cardOne) { //if the second card clicked equal to the first return
        return;
    }
    //this is the element that we clicked in
    this.classList.add("rotate")
    //if isflipped false
    if (!isFlipped) {
        isFlipped = true
        cardOne = this;
    }
    //if the clicked card isn't the first card
    else {
        isFlipped = false;
        cardTwo = this;
        checkForMatchedCards();
    }
}

function checkForMatchedCards() {
    //if it's a match remove the event listener from both cards we clicked
    if (cardOne.dataset.number === cardTwo.dataset.number) {
        cardOne.removeEventListener("click", flipCard)
        cardTwo.removeEventListener("click", flipCard)
        resetBoard();
    }
    //if not matched unflip the cards again
    else {
        //make the lockborad true so the even listener won't work
        lockBoard = true
        //add shaking animation if not matched
        setTimeout(() => {
            cardOne.classList.add("shake")
            cardTwo.classList.add("shake")
        }, 500)

        //we add settimeout so we can see the flipping and the second card
        setTimeout(() => {
            cardOne.classList.remove("rotate", "shake")
            cardTwo.classList.remove("rotate", "shake")
            resetBoard() //make it false again after the settimeout finishes
        }, 1500)
    }
}

function shuffle() {
    //get random number and change the order of the cards
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 16)
        card.style.order = randomNum
    })
}
window.onload = shuffle();


function resetBoard() { //reset everything to normal
    [cardOne, cardTwo] = [null, null];
    [isFlipped, lockBoard] = [false, false]
}

cards.forEach(card => {
    card.addEventListener("click", flipCard)
})
