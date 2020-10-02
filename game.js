// This goes in the second web page:
// Retrieve in the sessionStorage the value of difficulty selected in the first page
let difficultyLevel = sessionStorage.getItem('difficultyLevel');


//here, create the array i need to pick from

const arrayImagesUrl = ["https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287", "https://placekitten.com/200/287"];
//les url devront dépendre du niveau de difficulté et il doit y avoir deux fois la même URL à chaque fois

let cardWrapper = document.querySelector(".card-wrapper")
console.log(cardWrapper);

function createCard() {
    for (let i = 0; i < (arrayImagesUrl.length - 1); i += 1) {
        let imageUrl = arrayImagesUrl[i];

        let sceneElt = document.createElement("div");
        sceneElt.classList.add("scene", "scene--card");
        cardWrapper.appendChild(sceneElt);

        console.log(sceneElt);

        let cardElt = document.createElement("div");
        cardElt.classList.add("card");
        sceneElt.appendChild(cardElt);

        let cardFrontElt = document.createElement("div");
        cardFrontElt.classList.add("card_face", "card_face-front");
        cardFrontElt.style.backgroundImage = `url(${imageUrl})`;
        cardElt.appendChild(cardFrontElt);

        let cardBackElt = document.createElement("div");
        cardBackElt.classList.add("card_face", "card_face-back");
        cardBackElt.style.backgroundColor = "black";
        cardElt.appendChild(cardBackElt);
    }
}

createCard();
