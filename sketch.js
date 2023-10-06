const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint
const Body = Matter.Body
const Composite = Matter.Composite
const Composites = Matter.Composites

var quadrado
var rope
var rope2
var rope3
var fruit
var conect
var conect2
var conect3

var bg
var ballon
var cutbtn
var melon
var mute
var rabbit
var botao
var botao2
var botao3
var botaomute
var botaobalao
var som
var volume = 1
var botaorestart

var coelhocomendo
var coelhopiscando
var coelhotriste

var som1
var som2
var som3
var som4
var som5

let engine
let world

function preload(){
  bg = loadImage("background.png")
  botaorestart = loadImage("restart.png")
  ballon = loadImage("balloon.png")
  cutbtn = loadImage("cut_btn.png")
  melon = loadImage("melon.png")
  mute = loadImage("mute.png")
  som = loadSound("./coelhofinal/rope_cut.mp3")
  som1 = loadSound("./coelhofinal/air.wav")
  som3 = loadSound("./coelhofinal/eating_sound.mp3")
  som4 = loadSound("./coelhofinal/sad.wav")
  som5 = loadSound("./coelhofinal/sound1.mp3")
  rabbit = loadAnimation("rabbit-01.png")
  coelhocomendo = loadAnimation("./coelhofinal/eat_0.png", "./coelhofinal/eat_1.png", "./coelhofinal/eat_2.png", "./coelhofinal/eat_3.png", "./coelhofinal/eat_4.png" )
  coelhopiscando = loadAnimation("./coelhofinal/blink_1.png", "./coelhofinal/blink_2.png", "./coelhofinal/blink_3.png" )
  coelhotriste = loadAnimation("./coelhofinal/sad_1.png", "./coelhofinal/sad_2.png", "./coelhofinal/sad_3.png" )
  coelhocomendo.playing = true
  coelhocomendo.looping = false
  coelhopiscando.playing = true
  coelhotriste.playing = true
  coelhotriste.looping = false
}

function setup() {
  createCanvas(500,700);
  coelhopiscando.frameDelay = 25
  coelhotriste.frameDelay = 5
  engine = Engine.create()
  world = engine.world
  //quadrado = new Ground (250, 650, 500, 10)
  rope = new Rope (8, {x:250, y:0})
  rope2 = new Rope (10, {x:50, y:0})
  rope3 = new Rope (10, {x:400, y:0})
  fruit = Bodies.circle(200, 200, 20)
  Matter.Composite.add(rope.body, fruit)
  conect = new Link(rope, fruit)
  conect2 = new Link(rope2, fruit)
  conect3 = new Link(rope3, fruit)
  rectMode(CENTER)
  ellipseMode(CENTER)
  imageMode(CENTER)
  coelho = createSprite(250, 570)
  coelho.addAnimation("coelho", rabbit)
  coelho.addAnimation("coelhocomendo", coelhocomendo)
  coelho.addAnimation("coelhopiscando", coelhopiscando)
  coelho.addAnimation("coelhotriste", coelhotriste)
  coelho.addAnimation("coelhotriste", coelhotriste)
  coelho.changeAnimation("coelhopiscando")
  coelho.scale = 0.3
  botao = createImg("cut_btn.png")
  botao.size(50, 50)
  botao.position(225, 10)
  botao.mouseClicked(drop)
  botao2 = createImg("cut_btn.png")
  botao2.size(50, 50)
  botao2.position(30, 10)
  botao2.mouseClicked(drop2)
  botao3 = createImg("cut_btn.png")
  botao3.size(50, 50)
  botao3.position(378, 10)
  botao3.mouseClicked(drop3)
  botaomute = createImg("mute.png")
  botaomute.size(100, 100)
  botaomute.position(390, 580)
  botaomute.mouseClicked(mutar)
  botaobalao = createImg("balloon.png")
  botaobalao.position(0, 240)
  botaobalao.size(120, 100)
  botaobalao.mouseClicked(soprar)
  botaorestart = createImg("restart.png")
  botaorestart.size(100, 100)
  botaorestart.position(10, 600)
  botaorestart.mouseClicked(restart)
  som5.play()
}


function draw() 
{
  background(30);
  image(bg, 250, 350, 500, 700)
  if(keyDown("right")){
    quadrado.velocityX = 2;
  }

  //quadrado.show()
  rope.show()
  rope2.show()
  rope3.show()
  if(fruit != null){
    image(melon, fruit.position.x, fruit.position.y, 70, 70)
  }
  drawSprites();

  Engine.update(engine)

  if(collide(fruit, coelho)== true){
    coelho.changeAnimation("coelhocomendo")
    som3.play()
  }

  if(fruit != null && fruit.position.y >= 650){
    coelho.changeAnimation("coelhotriste")
    fruit = null
    som4.play()
  }
}

function drop(){
  rope.break()
  conect.dettach()
  conect = null
  som.play()
}

function drop2(){
  rope2.break()
  conect2.dettach()
  conect2 = null
  som.play()
}

function drop3(){
  rope3.break()
  conect3.dettach()
  conect3 = null
  som.play()
}


function collide(body, sprite){
  if(body != null){
    var D = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(D <= 80){
      World.remove(engine.world, fruit)
      fruit = null
      return true
  }else{
    return false
  }

  }
}

function soprar(){
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.01, y:0})
  som1.play()
}


function mutar(){
  if(volume > 0 ){
    volume = 0
    som.setVolume(volume)
    som1.setVolume(volume)
    som3.setVolume(volume)
    som4.setVolume(volume)
    som5.setVolume(volume)
  }else{
    volume = 1
    som.setVolume(volume)
    som1.setVolume(volume)
    som3.setVolume(volume)
    som4.setVolume(volume)
    som5.setVolume(volume)
  }
  if(som5.isPlaying()){
    som5.stop()
  }else{
    som5.play()
  }
}

function restart(){
  window.location = "index.html"
}

