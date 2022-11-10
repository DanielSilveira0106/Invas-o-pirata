const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon;
var score = 0;
var cannonball;
var angle = 20;
var boat;
var balls = [];
var boats = [];
var boatSpritedata , boatSpritesheet;
var boatAnimation = [];
var brokenBoatAnimation = [];
var brokenBoatSpritedata, brokenBoatSpritesheet;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatSpritedata = loadJSON("./assets/boat/boat.json");
  boatSpritesheet = loadImage("./assets/boat/boat.png")
  brokenBoatSpritedata = loadJSON("./assets/boat/brokenBoat.json");
  brokenBoatSpritesheet = loadImage("./assets/boat/brokenBoat.png");
}


function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angle = 20;
  angleMode(DEGREES);
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonball = new CannonBall(cannon.x,cannon.y);

  boat = new Boat(width-79,height-60,170,170,-80);

  var boatFrames = boatSpritedata.frames;
  for (var i = 0;i<boatFrames.length;i++) {
  var pos = boatFrames[i].position;
  var img = boatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
  boatAnimation.push(img)
  }
 var brokenBoatFrames = brokenBoatSpritedata.frames;
 for(i = 0;i<brokenBoatFrames.length;i++) {
 var pos = brokenBoatFrames[i].position;
 var img = brokenBoatSpritesheet.get(pos.x,pos.y,pos.w,pos.h);
 brokenBoatAnimation.push(img);



 }




  


}

function draw() {

  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();

  cannon.display();
  cannonball.display();

  for (var i = 0;i<balls.length;i++) {
  showCannonBalls(balls[i],i);
  collisionWithBoat(i)
  //Matter.Body.setVelocity(boat.body,{x:-0.9,y:0})



  
  showBoats();
  //boat.display();
}
}
function keyReleased() {
 if (keyCode===DOWN_ARROW) {
 //cannonball.shoot();
 balls[balls.length-1].shoot()
  }
  

}
function keyPressed () {
if (keyCode===DOWN_ARROW) {
var cannonball = new CannonBall(cannon.x,cannon.y);
balls.push(cannonball);
}


}
function showCannonBalls(ball,index) {
 if (ball) {
 ball.display();
 if(ball.body.position.x>=width||ball.body.position.y>=height-50) {
 ball.remove(index);


}
}



}
function showBoats() {
if (boats.length>0) {
  if (boats[boats.length-1]=== undefined || 
   boats[boats.length-1].body.position.x<width-300 ) {
   var positions = [-40,-60,-70,-20];
   var position = random(positions);
   var boat = new Boat (width,height-100,170,170,position,boatAnimation);
   boats.push(boat);
  }
  for (var i = 0;i<boats.length;i++)  {
  if (boats[i]) {
  Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
  boats[i].display();
  boats[i].animate();
  }


  }

} else {
boat = new Boat(width-79,height-60,170,170,-60,boatAnimation)
boats.push(boat)

}




}
function collisionWithBoat(index) {
 for (var i = 0;i<boats.length;i++) {
  if (balls[index]!=undefined&&boats[i]!=undefined) {
  var collision = Matter.SAT.collides(balls[index].body,boats[i].body)
  if (collision.collided) {
  boats[i].remove(i);
  balls[index].remove(index)

  }
 
  }



 }



} 
