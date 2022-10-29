//canvas
const CANVAS_WIDTH = 401;
const CANVAS_HEIGHT = 601;
//tiles
const WIDTH = 100;
const HEIGHT = 150;

let song;
var tiles = [];
var score = 0;
const TOP_SCORE = 60;
var ganar = false;
var play = false;
var contador = 300;
//0 representa a negro, -1 a rojo y 1 blanco

function setup() {
  sound= new Audio('kaguya confess.mp3')
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  //soundFormats('mp3');

  for (var i = 0; i < 4; i++) {
    newRow(); //el tamaño del arreglo tiles sera de 16
  }
}
function draw() {
  //console.log("length: " + tiles.length);
  background(50);
  addTiles();
  puntaje();
  contador--;
  //estado();
}
function addTiles() {
  for (let i = 0; i < tiles.length; i++) {
    /* var r = Math.floor(random(2))
    r==0?fill(0):fill(255);*/
    var x = (i % 4) * WIDTH;
    var y = Math.floor(i / 4) * HEIGHT;
    fill(tiles[i] === 0 ? 0 : tiles[i] === 1 ? "#ffffff" : "red");
    
    rect(x, y, WIDTH, HEIGHT);
    /* console.log("i: " + i);
    console.log("i % 4: " + (i % 4));
    console.log("x: " + x);
    console.log("i / 4: " + i / 4);
    console.log("y: " + y);*/
    //tiles.push(rect(i*WIDTH,0,WIDTH,HEIGHT));
  }
}
function newRow() {
  var column = Math.floor(random(4));
  for (var i = 0; i < 4; i++) {
    tiles.unshift(column === i ? 0 : 1); // push tiles to the front, A.K.A. top
  }
}
function puntaje() {
  if (!play) {
    if (contador >= 1) {
      textSize(32);
      fill(243, 156, 18);
      text(Math.floor(contador / 100) + 1, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    } else {
      contador = contador;
      sound.play()
      textSize(32);
      fill(243, 156, 18);
      text("Puntaje: " + score, CANVAS_WIDTH / 2 - 60, 50);
      play = false;
    }
  } else {
    estado(ganar);
  }
}

function estado(ganar) {
  if (ganar) {
    sound.pause()
    textSize(35);
    fill(243, 156, 18);
    text("¡Felicidades GANASTE!", CANVAS_WIDTH / 9 - 25, CANVAS_HEIGHT / 2);
    text(
      "Puntaje Total: " + score,
      CANVAS_WIDTH / 2 - 120,
      CANVAS_HEIGHT / 2 + 40
      );
    } else {
      sound.pause()
      textSize(35);
      fill(231, 76, 60);
      text("¡PERDISTE!", CANVAS_WIDTH / 4, CANVAS_HEIGHT / 2 - 40);
      text("¡Intentalo de nuevo!", CANVAS_WIDTH / 7, CANVAS_HEIGHT / 2);
      text("Puntaje Total: " + score, CANVAS_WIDTH / 5, CANVAS_HEIGHT / 2 + 40);
    }
  }
  
  function mousePressed() {
    /*console.log('posx: '+mouseX);
    console.log('posy: '+mouseY);*/
    //Aqui se tiene la ultima fila
    if (mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
      console.log("posy: en la cuarta fila");
      var type = ejeX(mouseX);
      if (tiles[type] !== 0) {
        //PERDER
        tiles[type] = -1;
        noLoop();
        play = true;
        ganar = false;
      } else {
        //GANAR
        score++;
        newRow();
        if (score >= TOP_SCORE) {
          play = true;
          ganar = true;
          score = TOP_SCORE;
          noLoop();
        }
    }
    console.log("posx: columna " + ejeX());
  }
}
function ejeX(mouseX) {
  for (let i = 0; i < 4; i++) {
    if (mouseX >= i * WIDTH && mouseX <= (i + 1) * WIDTH) {
      return i + 12;
    }
  }
  return -1;
}
