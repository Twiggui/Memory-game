//getting all the scores from the game page and localStorage
let lastItem = 0;
let listScoresTimes = [];

while (localStorage.getItem(`score${lastItem}`)) { //we check all the the existing score0, score1... and we get them in the array
    let score_time = localStorage.getItem(`score${lastItem}`);
    listScoresTimes.push(score_time);
    lastItem++;
}

// console.log(listScoresTimes);
//getting the latest score
let currentScoreTime = listScoresTimes[listScoresTimes.length - 1];
let currentScoreObject = {
    score: currentScoreTime.split("-")[0],
    time: currentScoreTime.split("-")[1],
}

//creating an array of objects
let listObjectsScores = [];
for (let i = 0; i < listScoresTimes.length; i++) {
    let miniArray = listScoresTimes[i].split("-");

    let object = {};
    object.score = miniArray[0];
    object.time = miniArray[1];

    listObjectsScores.push(object);
}

//sorting it by score (decreasing) - this compare function is useful to sort the scores
function compare(a, b) {
    if (parseInt(a.score) < parseInt(b.score)) {
        return 1;
    }
    if (parseInt(a.score) > parseInt(b.score)) {
        return -1;
    }
    return 0;
}

listObjectsScores.sort(compare); //the array is sorted depending on the score

//calculating the ranking for the current (latest) score and injecting a sentence into the HTML
let rankingCurrentScore = listObjectsScores.findIndex(i => i.time === currentScoreObject.time);;
let currentScoreElt = document.querySelector(".currentScore");
currentScoreElt.innerHTML = `Latest score <span>${currentScoreObject.score}</span> points for a rank of <span>${rankingCurrentScore + 1}</span> (on a total of ${listObjectsScores.length})`;

//creating an array with the five highest score
let nbScores = 10; //number of scores we want to inject in the page, that way it's easier to change later on
let arrayScoreElts = document.getElementsByClassName("score");
let arrayDatesElts = document.getElementsByClassName("date");

//we check which array is the "bigger": if there are less than 5 scores, it only injects the available ones
if (listObjectsScores.length >= nbScores) {
    for (let i = 0; i < nbScores; i += 1) {
        arrayScoreElts[i].innerHTML = listObjectsScores[i].score;

        let d = new Date(parseInt(listObjectsScores[i].time));
        let date = d.toLocaleDateString() + '-' + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        arrayDatesElts[i].innerHTML = date;
    }
} else {
    for (let i = 0; i < listObjectsScores.length; i += 1) {
        arrayScoreElts[i].innerHTML = listObjectsScores[i].score;

        let d = new Date(parseInt(listObjectsScores[i].time));
        let date = d.toLocaleDateString() + '-' + d.getHours() + ":" + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        arrayDatesElts[i].innerHTML = date;
    }
}