const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var ground, leftWall, rightWall;
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight = 300;

function setup() {
  createCanvas(1000,800);
  engine = Engine.create();
  world = engine.world;
  
  ground = new Ground(width/2, height, width, 20);
  rightWall = new Division(0,height/2, 5, height);
  leftWall = new Division(width, height/2, 5, height);
  for(var d = 0; d <= width; d = d + 80){
    divisions.push(new Division(d, height - divisionHeight/2, 10, divisionHeight));
  }
  for(var pl = 40; pl <= width; pl = pl +50){
    plinkos.push(new Plinko(pl,75,10));
  }
  for(var pl = 15; pl <= width; pl = pl +50){
    plinkos.push(new Plinko(pl,175,10));
  }
  for(var pl = 40; pl <= width; pl = pl +50){
    plinkos.push(new Plinko(pl,275,10));
  }
  for(var pl = 15; pl <= width; pl = pl +50){
    plinkos.push(new Plinko(pl,375,10));
  }
}

function draw(){
  background(0,0,255);  
  Engine.update(engine);

  

  for(var dd = 0; dd < divisions.length; dd++){
    divisions[dd].display();
  }
  for(var pld = 0; pld < plinkos.length; pld++){
    plinkos[pld].display();
  }
  if(frameCount%60 === 0){
    particles.push(new Particle(random(width/2-10, width/2+10),10,10))
  }
  for(var pad = 0; pad < particles.length; pad++){
    particles[pad].display();
  }
  ground.display();
  drawSprites();

  fill("yellow");
  textSize(80);
  text("PLINKO!", (width/2)-160, 490)
}
function keyPressed(){
  if(keyCode === 32){
    for(var pl = 15; pl <= width; pl = pl +50){
      particles.push(new Particle(pl,10,10));
    }
  }
  if(keyCode === 101){
    for(var pl = random(15,65); pl <= width; pl = pl +50){
      particles.push(new Particle(pl,110,10));
    }
  }
}