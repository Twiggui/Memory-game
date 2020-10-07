let score = 0;
let timer = 000;
function calculate() {
  if (timer > 090) {
    return (score = timer * 2 + ' points');
  } else if (timer <= 090 && timer >= 001) {
    return (score = timer + ' points');
  } else {
    return (score = 0 + ' points');
  }
}
