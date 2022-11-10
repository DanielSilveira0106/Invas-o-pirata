class Boat {
constructor(x,y,w,h,boatPos,boatAnimation) {
this.body = Bodies.rectangle(x,y,w,h);
World.add(world,this.body);
this.w = w;
this.h = h;
this.boatPos = boatPos;
this.image = loadImage("./assets/boat.png");
this.animation = boatAnimation;
this.speed = 0.05;

}
animate() {
this.speed +=0.05
}
display() {
var angle = this.body.angle;
var pos = this.body.position;
var index = floor(this.speed % this.animation.length)
push()
translate(pos.x,pos.y);
rotate(angle);
imageMode(CENTER)
image(this.animation[index],0,this.boatPos,this.w,this.h)
pop();

}
remove(index) {
    this.animation = brokenBoatAnimation;
    this.speed = 0.05;
    this.width = 300;
    this.height = 300;
    
    setTimeout(() => { 
         Matter.World.remove(world,
         boats[index].body); 
         delete boats[index]; }, 2000);



}


}
