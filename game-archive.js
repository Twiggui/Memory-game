// Retrieve in the sessionStorage the value of difficulty selected in the first page
let difficultyLevel = sessionStorage.getItem('difficultyLevel');
console.log(difficultyLevel);

//here, create the array we need to pick from
const stockingImages = ["https://placekitten.com/200/287", "http://place-puppy.com/200x200", "http://placebear.com/300/200", "https://placekitten.com/200/200", "http://place-puppy.com/300x300", "http://placeimg.com/300/200/animals", "https://placekitten.com/200/256", "http://place-puppy.com/200x345"];

let nbPairs = 0;

switch (difficultyLevel) {
    case 'easy':
        nbPairs = 4;
        break;
    case 'normal':
        nbPairs = 6;
        break;
    case 'hard':
        nbPairs = 8;
        break;
    default:
        console.log(`Error retrieving the level difficulty`);
}

let nbImages = 2 * nbPairs;

for (let i = 0; i < nbPairs; i += 1) {
    let valueToPush = stockingImages[i];
    arrayToShuffle.push(valueToPush);
    arrayToShuffle.push(valueToPush);
}

// console.log(arrayToShuffle);

//HERE: use the shuffle function
// const arrayImagesUrl = shuffle(arrayToShuffle);

const arrayImagesUrl = ["https://placekitten.com/200/287", "http://place-puppy.com/200x200", "http://placebear.com/300/200", "https://placekitten.com/200/200", "http://place-puppy.com/300x300", "http://placeimg.com/300/200/animals"];
//les url devront dépendre du niveau de difficulté et il doit y avoir deux fois la même URL à chaque fois

let cardWrapper = document.querySelector(".card-wrapper")

function createCard() {
    for (let i = 0; i < (arrayImagesUrl.length); i += 1) {
        let imageUrl = arrayImagesUrl[i];

        let sceneElt = document.createElement("div");
        sceneElt.classList.add("scene", "scene--card");
        cardWrapper.appendChild(sceneElt);

        let cardElt = document.createElement("div");
        cardElt.classList.add("card");
        sceneElt.appendChild(cardElt);

        let cardFrontElt = document.createElement("div");
        cardFrontElt.classList.add("card_face", "card_face-front");
        cardFrontElt.style.backgroundColor = "black";
        cardElt.appendChild(cardFrontElt);

        let cardBackElt = document.createElement("div");
        cardBackElt.classList.add("card_face", "card_face-back");
        cardBackElt.style.backgroundImage = `url(${imageUrl})`;
        cardElt.appendChild(cardBackElt);
    }
}

createCard();

//turning cards on click
let cards = document.querySelectorAll('.card');
// console.log(cards);

for (let card of cards) {
    // console.log(card);
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });
}