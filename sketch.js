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
var fruit
var conect

let engine
let world

function setup() {
  createCanvas(400,400);
  engine = Engine.create()
  world = engine.world
  quadrado = new Ground (200, 395, 400, 10)
  rope = new Rope (5, {x:200, y:0})
  fruit = Bodies.circle(200, 200, 20)
  Matter.Composite.add(rope.body, fruit)
  conect = new Link(rope, fruit)
}

function draw() 
{
  background(30);
  if(keyDown("right")){
    quadrado.velocityX = 2;
  }

  quadrado.show()
  rope.show()
  ellipse(fruit.position.x, fruit.position.y, 20, 20)
  drawSprites();

  Engine.update(engine)

}




