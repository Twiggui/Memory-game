//getting all the scores from the game page and localStorage
let lastItem = 0;
let listScoresTimes = [];

while (localStorage.getItem(`score${lastItem}`)) {
    let score_time = localStorage.getItem(`score${lastItem}`);
    listScoresTimes.push(score_time);
    lastItem++;
}

console.log(listScoresTimes);

//creating an array of objects
let listObjectsScores = [];
for (let i = 0; i < listScoresTimes.length; i++) {
    let miniArray = listScoresTimes[i].split("-");
    console.log(miniArray);

    let object = {};
    object.score = miniArray[0];
    object.time = miniArray[1];
    console.log(object);

    listObjectsScores.push(object);
    console.log(listObjectsScores);
}

//sorting it by score (decreasing)
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
console.log(listObjectsScores);

//creating an array with the five highest score
let nbScores = 5; //number of scores we want to inject in the page, that way it's easier to change later on
let arrayScoreElts = document.getElementsByClassName("score");
let arrayDatesElts = document.getElementsByClassName("date");

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
    }
}