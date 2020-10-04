const cardTable = document.querySelectorAll('.card'); //récupération des cartes depuis le DOM
const imgTable = document.querySelectorAll('.card-face-front'); // récupération des images dans les cartes depuis le DOM
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

    console.log('cardTable.length : ' + cardTable.length);
    console.log('openedCards.length : ' + openedCards.length);

    setTimeout(() => {
      if (cardTable.length === openedCards.length) {
        alert("c'est gagné ! Tu as réussi en " + nbDeCoups + ' coups');
      }
    }, 1000);
  });
}

/*section shuffle*/

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
/*
On arrive dans la fonction avec un tableau de taille 4
[a,b,c,d]
currentIndex = 4

On rentre dans la boucle
currentIndex = 4
randomIndex = 2 (par ex) => la ligne c
currentIndex = 3 (4 - 1) => la ligne d
On inverse les valeurs
temporaryValue = array[currentIndex] => d
array[currentIndex] = array[randomIndex]
en fait array[3] = array[2]
du coup array[3] = c
=> [a,b,c,c]
array[randomIndex] = temporaryValue
en fait array[2] = d
=> [a,b,d,c]
=> [a,b,d,c]


currentIndex = 3
randomIndex = 1 (par ex) => la ligne b
currentIndex = 2 (3 - 1) => la ligne d
On inverse les valeurs
temporaryValue = array[currentIndex] => d
array[currentIndex] = array[randomIndex]
en fait array[2] = array[1]
du coup array[2] = b
=> [a,b,b,c]
array[randomIndex] = temporaryValue
en fait array[1] = d
=> [a,d,b,c]
=> [a,d,b,c]


currentIndex = 2
randomIndex = 0 (par ex) => la ligne a
currentIndex = 1 (2 - 1) => la ligne d
On inverse les valeurs
temporaryValue = array[currentIndex] => d
array[currentIndex] = array[randomIndex] => a
=> [a,a,b,c]
arrat[randomIndex] = temporaryValue
=> [d,a,b,c]
=> [d,a,b,c]


currentIndex = 1
randomIndex = 0 => la ligne d
currentIndex = 0 (1 - 1) => la ligne a
On inverse
temporaryValue = array[currentIndex] => a
array[currentIndex] = array[randomIndex] => d
=> [d,d,b,c]
array[randomIndex] = temporaryValue
=> [a,d,b,c]
=> [a,d,b,c]

currentIndex = 0 donc on sort de la boucle

=> [a,d,b,c]

*/
function shufflehtmlcards() {
  /*recuperer les div.card-scene*/
  let cards = document.querySelectorAll('.card-scene');
  /*on a recupe les carte*/
  console.log('on a recuperé les cartes', cards);
  /*transformer cards en tableau*/
  const cardsArray = [];
  for (let i = 0; i < cards.length; i += 1) {
    cardsArray.push(cards[i]);
  }
  /*melanger les cartes*/
  shuffle(cardsArray);
  /*replacer les cartes dans la div conteneur*/
  /*vider le conteneur*/
  const container = document.getElementById('conteneur');
  container.innerHTML = '';
  /*reajouter les carte melangé*/
  for (i = 0; i < cardsArray.length; i += 1) {
    container.appendChild(cardsArray[i]);
  }
}
shufflehtmlcards();
