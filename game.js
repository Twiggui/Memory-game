//first step: create the shuffle function, to the urls for the future cards
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Retrieve in the sessionStorage the value of difficulty selected in the first page
let difficultyLevel = sessionStorage.getItem('difficultyLevel');
console.log(difficultyLevel);

//here, create the array we need to pick from - here, we stock all the URLS for possible future images
const stockingImages = [
  'https://placekitten.com/200/287',
  'http://place-puppy.com/200x200',
  'http://placebear.com/300/200',
  'https://placekitten.com/200/200',
  'http://place-puppy.com/300x300',
  'https://placekitten.com/200/322',
  'https://placekitten.com/200/256',
  'http://place-puppy.com/200x345',
];

let nbPairs = 0;

//different number of pairs depending on the difficulty level
switch (difficultyLevel) {
  case 'easy':
    nbPairs = 3;
    break;
  case 'normal':
    nbPairs = 5;
    break;
  case 'hard':
    nbPairs = 7;
    break;
  default:
    console.log(`Error retrieving the level difficulty`);
}

let nbImages = 2 * nbPairs;
let arrayToShuffle = [];

for (let i = 0; i < nbPairs; i += 1) {
  let valueToPush = stockingImages[i];
  //we need to have each url twice so we push the same value twice
  arrayToShuffle.push(valueToPush);
  arrayToShuffle.push(valueToPush);
}

//HERE: use the shuffle function
console.log(arrayToShuffle);
const arrayImagesUrl = shuffle(arrayToShuffle);

//console logging to check everything is going well
console.log(arrayImagesUrl);

//creating the cards
let cardWrapper = document.querySelector('.conteneur');

function createCard() {
  for (let i = 0; i < arrayImagesUrl.length; i += 1) {
    let imageUrl = arrayImagesUrl[i];

    // let sceneElt = document.createElement("div");
    // sceneElt.classList.add("scene", "scene--card");
    // cardWrapper.appendChild(sceneElt);

    let cardElt = document.createElement('div');
    cardElt.classList.add('card');
    cardElt.title = imageUrl;
    cardWrapper.appendChild(cardElt);

    let cardFrontElt = document.createElement('img');
    cardFrontElt.classList.add('card-face', 'card-face-front');
    cardFrontElt.src = imageUrl;
    cardElt.appendChild(cardFrontElt);

    let cardBackElt = document.createElement('img');
    cardBackElt.classList.add('card-face', 'card-face-back');
    cardBackElt.src =
      'https://cybersavoir.csdm.qc.ca/bibliotheques/files/2018/11/10_banques_dimages_gratuites_libres_de_droits-300x169.jpg';
    cardElt.appendChild(cardBackElt);
  }
}

createCard();

//flipping them and checking if they match
const cardTable = document.querySelectorAll('.card'); //récupération des cartes depuis le DOM
// const imgTable = document.querySelectorAll('.card-face-front'); // récupération des images dans les cartes depuis le DOM
let openedCards = []; //tableau qui va compter le nombre de cartes retournées
let nbCartesTestees = 0;
let nbDeCoups = 0;

for (let i = 0; i < cardTable.length; i += 1) {
  cardTable[i].addEventListener('click', function () {
    cardTable[i].classList.toggle('is-flipped'); //active le CSS pour animation de retournement de carte
    cardTable[i].classList.toggle('disabled'); //active le CSS .disabled qui rend la carte non cliquable

    nbCartesTestees += 1;
    cardTable[i].classList.add('enAttente');
    let imagesCompare = document.querySelectorAll('.enAttente');

    if (nbCartesTestees === 2) {
      if (imagesCompare[0].title === imagesCompare[1].title) {
        for (let j = 0; j < imagesCompare.length; j += 1) {
          imagesCompare[j].classList.remove('enAttente');
          imagesCompare[j].classList.remove('disabled');
          imagesCompare[j].classList.add('matched');
          nbCartesTestees = 0;
          nbDeCoups += 0.5;
          setTimeout(() => {
            openedCards.push('a card found');
          }, 1000);
        }
      } else {
        for (let j = 0; j < imagesCompare.length; j += 1) {
          imagesCompare[j].classList.remove('enAttente');
          imagesCompare[j].classList.remove('disabled');
          setTimeout(function () {
            imagesCompare[j].classList.remove('is-flipped');
          }, 1200);
          nbCartesTestees = 0;
          nbDeCoups += 0.5;
        }
      }
    }

    // console.log('cardTable.length : ' + cardTable.length);
    // console.log('openedCards.length : ' + openedCards.length);
    let overlayPopupWin = document.querySelector('.popupWin');
    let overlayPopupLoose = document.querySelector('.popupLoose');
    setTimeout(() => {
      if (cardTable.length === openedCards.length) {
        overlayPopupWin.style.display = 'block';
        let finalMove = document.querySelector('.finalMove');
        finalMove.innerHTML = `Tu as gagné en ${nbDeCoups} coups`;
        document.querySelector('body').classList.add('winner');
        /*        let totalTime = document.querySelector('.totalTime');
        /*  totalTime.innerHTML = `${}`; */
      }
    }, 1000);
  });
}

/* button pou fermer la page*/

const buttonCroix = document.querySelector('.close-win');
buttonCroix.addEventListener('click', () => {
  let overlayPopupWin = document.querySelector('.popupWin');
  overlayPopupWin.style.display = 'none';
});

/*reload la page avec button replay*/

const replayGame = document.querySelector('.replay');
replayGame.addEventListener('click', () => {
  document.location.reload(true);
});

//this will have to be added in the "winning" event of the game
let currentTime = new Date().getTime();

let score = Math.floor(Math.random() * 1500); //here we'll have to get the score from the score calculating function
let score_time = score + '-' + currentTime;

// localStorage.clear(); - if we want to clean the local storage

let lastItem = 0;

while (localStorage.getItem(`score${lastItem}`)) {
  //we're checking the existing score0, score1, score2...and creating a new one
  lastItem++;
}
localStorage.setItem(`score${lastItem}`, score_time);
// console.log(lastItem);
// console.log(score_time);
