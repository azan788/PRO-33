var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var gameState = "play";
var timer = 0;

var divisionHeight=300;
var score = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  
  particle = new Particle(1000,10,1,1);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50) {  
    plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50) {  
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  }    
}
 


function draw() {
  background("black");
  textSize(30)
  text("Score : " + score, 20, 40);
  Engine.update(engine);
  console.log(timer);

  for (var i = 0; i < plinkos.length; i++) {   
    plinkos[i].display();   
  }
  if(frameCount%60===0){
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    if(gameState === "play"){
      score = score + Math.round(random(1,10));
    }
  }
  if(gameState !== "end"){
    for (var j = 0; j < particles.length; j++) {
      particles[j].display();
    }
    textSize(30);
    text("500", 15, 530);
    text("500", 95, 530);
    text("500", 175, 530);
    text("500", 255, 530);

    text("100", 335, 530);
    text("100", 415, 530);
    text("100", 495, 530);

    text("200", 575, 530);
    text("200", 655, 530);
    text("200", 735, 530);
  }
  
  for (var k = 0; k < divisions.length; k++) {  
    divisions[k].display();
  }
  
  ground.display();

  
  if(timer >= 6){
    gameState = "end";
    particle = null;
  }

  if(particle!=null){
    particle.display();

    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300){
        score = score + 500;
        particle = null;
      }
    }
  }
  if(particle!=null){
    particle.display();

    if(particle.body.position.y > 760){
      if(particle.body.position.x > 301 && particle.body.position.x < 600){
        score = score + 500;
        particle = null;
      }
    }
  }
  if(particle!=null){
    particle.display();

    if(particle.body.position.y > 760){
      if(particle.body.position.x > 601 && particle.body.position.x < 900){
        score = score + 500;
        particle = null;
      }
    }
  }
  if(gameState === "end"){
    particles.push(null);
    textSize(80)
    text("Game Over", 190, 250)
  }
  

}
function mousePressed(){
  //for(var pl = 15; pl <= width; pl = pl +50){
    //particles.push(new Particle(pl,10,10));
  //}

  if(gameState !== "end"){
    particle = new Particle(mouseX, 40, 10, 10);
    timer++;
  }

}
