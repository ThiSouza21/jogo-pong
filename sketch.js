// Variavel da Bola
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;

//Variavel da Raquete
let xRaquete = 5;
let yRaquete = 150;
let compRaquete = 10;
let altRaquete = 90;

//Variaveis da Raquete do Oponente
let xRaqueteMal = 585;
let yRaqueteMal = 150;
let yVelocidadeMal = 6;

//Velocidade da Bola
let xVelocidadeBola = 9;
let yVelocidadeBola = 9;

//Variavel do Placar
let pontosBem = 0
let pontosMal= 0

//Variavel de Colisão
let colidiu = false;

//Variavel de Chance
let chanceDeErrar = 0;

//Sons do Jogo
let trilha;
let raquete;
let ponto;



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function preload() {
  trilha = loadSound("trilha.mp3")
  raquete = loadSound("raquetada.mp3")
  ponto = loadSound("ponto.mp3")
}

function draw() {
  background(0);
  seeBola();
  runBola();
  colisaoBolaBorda();
  seeTabua(xRaquete, yRaquete);
  movimentoTabua();
  //movimentoTabuaMal();
  colisaoRaquete(xRaquete, yRaquete);
  seeTabua(xRaqueteMal, yRaqueteMal);
  movimentoRaqueteMal();
  colisaoRaquete(xRaqueteMal, yRaqueteMal);
  placarJogo();
  bolinhaNaoFicaPresa();
}

function bolinhaNaoFicaPresa() {
  if (xBola - raio < 0){
    xBola = 26;
    }
  if (xBola + raio > 590){
    xBola = 558;
    }
}

function movimentoRaqueteMal() {
  yVelocidadeMal = yBola - yRaqueteMal - compRaquete / 2 - 30;
  yRaqueteMal += yVelocidadeMal + chanceDeErrar
  chanceDeErrarMal();
}

function chanceDeErrarMal() {
  if (pontosMal > pontosBem + 1){
    chanceDeErrar += 1;
    if (chanceDeErrar > 39){
      chanceDeErrar = 40
    }
  }
  if (pontosMal < pontosBem - 1){
    chanceDeErrar -= 1;
    if (chanceDeErrar < 35){
      chanceDeErrar = 35
    }
  }
  
}

function seeBola() {
  circle(xBola, yBola, diametro)
  
}

function runBola() {
  xBola += xVelocidadeBola
  yBola += yVelocidadeBola
}

function colisaoBolaBorda() {
  if (xBola + raio > width || xBola - raio < 0) {
    xVelocidadeBola *= -1;
  }
  if (yBola + raio > height || yBola - raio < 0) {
    yVelocidadeBola *= -1;
  }
}

function seeTabua(x, y) {
  rect(x, y, compRaquete, altRaquete)
}

function movimentoTabuaMal() {
  if (keyIsDown(UP_ARROW)){
    yRaqueteMal -= 6;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteMal += 6;
  }
}

function movimentoTabua() {
  if (keyIsDown(87)){
    yRaquete -= 6;
  }
  if (keyIsDown(83)){
    yRaquete += 6;
  }
}
function colisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, compRaquete, altRaquete, xBola, yBola, raio);
  if (colidiu){
    xVelocidadeBola *= -1;
    raquete.play();
  }
}

function colisaoRaqueteMal() {
  colidiu = collideRectCircle(xRaqueteMal, yRaqueteMal, compRaquete, altRaquete, xBola, yBola, raio);
  if (colidiu){
    xVelocidadeBola *= -1;
    raquete.play();
  }
}

function placarJogo() {
  stroke(250);
  textAlign(CENTER);
  textSize(32);
  fill(color(180, 78, 216))
  rect(120, 10, 60, 30)
  fill(250);
  text(pontosBem, 150, 35);
  fill(color(180, 78, 216))
  rect(420, 10, 60, 30)
  fill(250);
  text(pontosMal, 450, 35);
  
  if (xBola > 590){
    pontosBem += 1;
    ponto.play();
  }
  if (xBola < 10){
    pontosMal += 1;
    ponto.play();
    
  }
}


