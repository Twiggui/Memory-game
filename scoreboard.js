let lastItem = 0;
let listScoresTimes = [];

while (localStorage.getItem(`score${lastItem}`)) {
    let score_time = localStorage.getItem(`score${lastItem}`);
    listScoresTimes.push(score_time)
    lastItem++;
}

console.log(listScoresTimes)

