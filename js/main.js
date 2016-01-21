var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");
var lastTime = new Date();
var timeDiff = 0;
var frequency = 200; //ms
var counter = 1;
var minFontSize = 48;
var maxFontSize = 64;
var fontDiff = maxFontSize - minFontSize;
var offset = { x : 0 , y: 0 };
var counterText = '';
var counterTextSize = '';
var ooooText = '';
var ooooSpeed = 200

for (var i = 0; i < 100; i++) {
  ooooText += (getRandomBool() ? "O" : "o");
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Fill black
  // context.fillStyle = "rgba(0, 0, 0, 255)";
  // context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(255, 165, 0, 255)";

  var newTime = new Date();
  timeDiff += newTime - lastTime;
  lastTime = newTime;

  if (timeDiff >= frequency) {
    timeDiff -= frequency;
    offset = { x: getRandomArbitrary(0,2), y: getRandomArbitrary(0,2) };
    counter++;
    counterText = "x" + counter;
    counterTextSize = context.measureText(counterText);
  }

  var fontSize = minFontSize + ((frequency - timeDiff) / frequency) * fontDiff;
  fontSize = fontSize > minFontSize ? fontSize : minFontSize;
  fontSize = fontSize > maxFontSize ? maxFontSize : fontSize;

  var ooooXPosition = ((frequency - timeDiff) / frequency) * ooooSpeed;

  context.font = fontSize + "px Verdana";
  context.fillText(counterText, (counterTextSize.width / 2) + offset.x, 40 + (fontSize / 2) + offset.y);

  context.font = "bold 28px Verdana";
  context.save();
  context.rotate(Math.PI*2/(360) * -5);
  context.fillText("COMBO", (counterTextSize.width / 2) + offset.x, 80 + (fontSize / 2) + offset.y);
  context.restore();

  context.fillText(ooooText, ooooXPosition - 200, canvas.height - 10);

  window.requestAnimationFrame(draw);
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomBool() {
  return Math.floor(Math.random() * 2) === 0;
}

window.requestAnimationFrame(draw);
