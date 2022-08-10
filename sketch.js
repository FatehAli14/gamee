const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var bgImg,ground1,ground2,ground3,ground4,ground5;
var canvas;
var hero,hero_img;
var enemy1,enemy2,enemy3,enemy4;
var enemy1_img,enemy2_img,enemy3_img,enemy4_img;
var arrow_img;
var laserGroup,laser_img;
var arrowGroup;
var enemy;
var score = 0;
var gameState  = "Start";
var arrow_sound,explosion_sound;

function preload(){
  bgImg = loadImage("images/Space.jpg");
  hero_img = loadImage("images/Hero2.jpg")
  //enemy1_img = loadImage("images/Enemy1.jpg");
  //enemy2_img = loadImage("images/Enemy2.jpg");
  enemy1_img = loadImage("images/Enemy1.jpg");
  enemy2_img = loadImage("images/Enemy2.jpg");
  laser_img = loadImage("images/LaserBeams.png");
  arrow_img = loadImage("images/arrow.png");
  
  arrow_sound = loadSound("images/laser sound.wav");
  explosion_sound = loadSound("images/explosion.wav")
 
}

function setup() {
  canvas = createCanvas(1000,600);
  engine = Engine.create();
  world = engine.world;

   score = 0 
  
  hero =createSprite(460, 520,80,100);
  hero.addImage(hero_img);
  hero.scale=0.2;
  ground1 = new Ground(500,510,1000,10);
 
  laserGroup = new Group();
  arrowGroup  = new Group();
  enemyGroup = new Group();

  
}

function draw(x) {
  background(bgImg);
  Engine.update(engine);
    //console.log(mouseX,mouseY)
    
    
    if(gameState==="Start"){
      hero.x = mouseX;

      if (keyDown("space")) {
        //arrowSound.play();
        heroPellets();    
      } 
  
     if (frameCount % 80 === 0) {
      laser = createSprite(random(100, 1000), 0, 100, 100);
      laser.scale=0.08;
      laser.velocityY = 6;
      var rand = Math.round(random(1,5));
      switch(rand){
          case 1: laser.addImage("laser1",laser_img);
          break;
          case 2: laser.addImage("laser1", laser_img);
          break;
          case 3: laser.addImage("laser1", laser_img);
          break;
          case 4: laser.addImage("laser1", laser_img);
          break;
          case 5: laser.addImage("laser1", laser_img);
          break;
      }
        laserGroup.add(laser);
        laser.lifetime = 100
  }
  
      if (frameCount % 200 === 0) {
        enemy = createSprite(random(100, 1000), 0, 100, 100);
        enemy.debug =false;
        enemy.scale=0.08;
        enemy.velocityY = 2;
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: enemy.addImage("enemy1",enemy1_img);
            break;
            case 2: enemy.addImage( "enemy1", enemy2_img);
            break;
            
        }
        enemy.lifetime = 500
        enemyGroup.add(enemy);  
      }
    
      if(arrowGroup.isTouching(enemyGroup)){
        explosion_sound.play();
        score = score +1;
        enemy.lifetime=0;
        arrowGroup.destroyEach();
       }
  
      if(laserGroup.isTouching(hero)){
        hero.destroy();
        gameState = "End";
        laserGroup.destroyEach();
        
      }
   
     //for (var i = 0; i < laserGroup.length; i++) {
         //if (laserGroup.get(i).isTouching(ground1,hero)) {
         //    laserGroup.get(i).destroy();
            
             
        //}
         
   // }
   
    
    
    //ground1.display();
    //mouseMoved();
    
  }else{
   arrowGroup.destroyEach();
   enemyGroup.destroyEach();
   laserGroup.destroyEach();
   fill("white");
   textSize(32)
  text("GAME OVER",400,300);
  }  

  fill('white')
  textSize(32);
  text("Score: "+ score, 800,60);
  drawSprites();
}  

function mouseMoved(x){
 
}

function heroPellets(){
    var arrow= createSprite(419,454, 10, 100);
    arrow.addImage(arrow_img);
    arrow_sound.play();
    arrow.debug=false;
    arrow.shapeColor="black";
    arrow.x = 460;
    arrow.x=hero.x;    
    arrow.velocityY = -4;
    arrow.lifetime = 200;
    arrow.scale = 0.1;
    arrowGroup.add(arrow);
    return arrow;
}


