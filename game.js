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

/* declaration de la fonction de calcule du score*/
let score = 0;
function calculate() {
  let timer = document.getElementById('timer').innerHTML;
  let timeArray = timer.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond(timeArray[1] - 1);
  let presentTime = m * 60 + s;
  if (presentTime > 090) {
    return (score = presentTime * 2 + ' points');
  } else if (presentTime <= 090 && presentTime > 000) {
    return (score = presentTime + ' points');
  } else {
    return (score = 0 + ' points');
  }
}

// Retrieve in the sessionStorage the value of difficulty selected in the first page
let difficultyLevel = sessionStorage.getItem('difficultyLevel');
console.log(difficultyLevel);

//here, create the array we need to pick from - here, we stock all the URLS for possible future images
const stockingImages = [
  'images/cat_paw_small.jpg',
  'images/dog_paw_small.jpg',
  'images/duck_feet.jpg',
  'images/elephant_feet_small.jpg',
  'images/horse_hoove_small.jpg',
  'images/monkey_hand_small.jpg',
  'images/fish_fin_small.jpg',
  'images/baby_hand.jpg',
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
const arrayImagesUrl = shuffle(arrayToShuffle);

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
    // cardElt.title = imageUrl;
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
    // console.log(imagesCompare);
    // console.log(imagesCompare[0].childNodes);

    if (nbCartesTestees === 2) {
      if (imagesCompare[0].childNodes[0].src === imagesCompare[1].childNodes[0].src) {
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

    // QUAND ON GAGNE //
    // console.log('cardTable.length : ' + cardTable.length);
    // console.log('openedCards.length : ' + openedCards.length);
    let overlayPopupWin = document.querySelector('.popupWin');
    let overlayPopupLoose = document.querySelector('.popupLoose');
    setTimeout(() => {
      if (cardTable.length === openedCards.length) {
        overlayPopupWin.style.display = 'block';
        let finalMove = document.querySelector('.finalMove');
        document.querySelector('body').classList.add('winner');
        let score = calculate();
        let score_time = score + '-' + currentTime;

        finalMove.innerHTML = `Tu as gagné avec ${score} en ${nbDeCoups} coups`;

        // localStorage.clear(); - if we want to clean the local storage

        let lastItem = 0;

        while (localStorage.getItem(`score${lastItem}`)) {
          //we're checking the existing score0, score1, score2...and creating a new one
          lastItem++;
        }
        localStorage.setItem(`score${lastItem}`, score_time);
        /*        let totalTime = document.querySelector('.totalTime');
        /*  totalTime.innerHTML = `${}`; */
      }
    }, 1000);
  });
}

/* button pour fermer la popUpWIN*/

const buttonCroix = document.querySelector('.close-win');
buttonCroix.addEventListener('click', () => {
  let overlayPopupWin = document.querySelector('.popupWin');
  overlayPopupWin.style.display = 'none';
});
/* button pour fermer la popUpLOOSE*/

const buttonCroixLoose = document.querySelector('.close-loose');
buttonCroixLoose.addEventListener('click', () => {
  let overlayPopupLoose = document.querySelector('.popupLoose');
  overlayPopupLoose.style.display = 'none';
});

/*reload la page avec button replay*/

const replayGame = document.querySelector('.replay');
replayGame.addEventListener('click', () => {
  document.location.reload(true);
});

//this will have to be added in the "winning" event of the game
let currentTime = new Date().getTime(); //here we'll have to get the score from the score calculating function

/* let score = Math.floor(Math.random() * 1500); */
// console.log(lastItem);
// console.log(score_time);

document.getElementById('timer').innerHTML = 01 + ':' + 010;
startTimer();

function startTimer() {
  let presentTime = document.getElementById('timer').innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 01 && s <= 30) {
    document.getElementById('timer').style.color = 'red';
    document.getElementById('timer').style.textShadow = 'red';
  }
  if (m < 0) {
    /*Popup Loose*/
    let overlayPopupLoose = document.querySelector('.popupLoose');
    overlayPopupLoose.style.display = 'block';
    let cards = document.querySelectorAll('.card');
    for (let card of cards) {
      card.classList.add('disabled');
    }
    return;
  }

  document.getElementById('timer').innerHTML = m + ':' + s;
  // console.log(m);
  if (!document.querySelector('body').classList.contains('winner')) {
    setTimeout(startTimer, 1000);
  }
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = '0' + sec;
  }
  if (sec < 0) {
    sec = '59';
  }
  return sec;
}
