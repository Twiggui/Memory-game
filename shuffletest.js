// Fisher-Yates (aka Knuth) Shuffle

let tableImg = document.querySelectorAll('img');
let tableAndClass = [];

for (i = 0; i < tableImg.length; i += 1) {
  let classeName = tableImg[i].src.valueOf();
  tableImg[i].classList.add(classeName);
  tableAndClass.push(tableImg[i]);
}

function shuffle(tableAndClass) {
  let currentIndex = tableAndClass.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = tableAndClass[currentIndex];
    tableAndClass[currentIndex] = tableAndClass[randomIndex];
    tableAndClass[randomIndex] = temporaryValue;
  }
  return tableAndClass;
}

// deck of all cards in game
//const deck = document.querySelector('.deck');
//function startGame() {
//var shuffledCards = shuffle(cards);
//for (var i = 0; i < shuffledCards.length; i++) {
// [].forEach.call(shuffledCards, function (item) {
// deck.appendChild(item);
// });
// }
//}
console.log(shuffle(tableAndClass));
