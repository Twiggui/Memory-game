document.getElementById('timer').innerHTML = 010 + ':' + 040;
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
const buttonCroixLoose = document.querySelector('.close-loose');
buttonCroixLoose.addEventListener('click', () => {
  document.location.reload(true);
});
