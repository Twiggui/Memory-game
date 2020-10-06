//handling the burger menu
function displayBurger() {
  let x = document.getElementById('myLinks');
  if (x.style.display === 'block') {
    x.style.display = 'none';
  } else {
    x.style.display = 'block';
  }
}

const burgerIcon = document.querySelector('.icon');
burgerIcon.addEventListener('click', displayBurger);

window.addEventListener('resize', function () {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let x = document.getElementById('myLinks');
  if (vw >= 570) {
    x.style.display = 'flex';
  } else if (vw < 570) {
    x.style.display = 'none';
  }
});

//getting the selected level and stocking in session storage

let radioButtons = document.getElementsByClassName("difficulty");
let playButton = document.querySelector(".button a");

playButton.addEventListener("click", function () {
  let difficultyLevel = "";

  for (let radioButton of radioButtons) {
    if (radioButton.checked) {
      difficultyLevel = radioButton.value;
      console.log(difficultyLevel);
    }
  }

  sessionStorage.setItem("difficultyLevel", difficultyLevel);
});
