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
