const Engine = Matter.Engine
const World = Matter.World
const Events = Matter.Events
const Bodies = Matter.Bodies

  var HEAD = 0;
  var PLAY = 1;
  var END =2;
  var gameState = HEAD;

  var plinkoImg;
  var plinkoBody;
  var startImg;
  var startBody;
  var backgroundImg;
  var start;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var shots = 10;

function preload(){
  plinkoImg = loadImage("plinko.png");
  startImg = loadImage("startButton.png");
  backgroundImg = loadImage("background.jpg");
}

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  if(gameState === HEAD){
    plinkoBody = createSprite(400, 100, 10, 10);
    plinkoBody.addImage("plinko", plinkoImg);
    plinkoBody.scale = 0.6;
    startBody = createSprite(400, 600, 10, 10);
    startBody.addImage("start", startImg);
    startBody.scale = 0.5;
    start = createSprite(400, 600, 100, 100);
    start.visible = false;
  }

  ground = new Ground(width/2,height,width,20);
  
   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}

function mouseDragged(){

}
function mouseReleased(){
  gameState = PLAY;
  if(gameState !== END){

    if(shots>0){

      if(gameState !== END){

        shots = shots - 1;
        particle = new Particle(mouseX, 10, 10);
      }
    }
  }
}

function draw() {
  background(backgroundImg);
  textSize(20)
  fill("white");
  Engine.update(engine);
 
  if(gameState === PLAY){

    ground.display();

   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   

   startBody.destroy();
   plinkoBody.destroy();
 
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   textSize(20);
   fill("white");
   text("Score : "+ score, 20, 30);
   text("Shots : "+shots, 700, 30);
   text("500", 25, 550);
   text("500", 105, 550);
   text("300", 185, 550);
   text("300", 265, 550);
   text("100", 345, 550);
   text("100", 425, 550);
   text("300", 505, 550);
   text("300", 585, 550);
   text("500", 665, 550);
   text("500", 745, 550);

if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>730)
        {
              if (particle.body.position.x > 0 && particle.body.position.x < 160) 
              {
                  score=score+500;      
                  particle=null;
                  if ( shots<= 0) gameState =END;                          
              }


              else if (particle.body.position.x > 160 && particle.body.position.x < 320) 
              {
                    score = score + 300;
                    particle=null;
                    if ( shots<= 0) gameState =END;

              }
              else if (particle.body.position.x > 320 && particle.body.position.x < 480 )
              {
                    score = score + 100;
                    particle=null;
                    if ( shots<= 0)  gameState =END;

              }
              else if (particle.body.position.x > 480 && particle.body.position.x < 640)
              {
                    score = score + 300;
                    particle = null;
                    if( shots<=0) gameState = END;
              }
              else if (particle.body.position.x > 640 && particle.body.position.x < 800)
              {
                    score = score + 500;
                    particle = null;
                    if ( shots<=0) gameState = END;
              }
              
        }
      }
    }

    if(gameState === END){
      textSize(20);
      fill("white");
      text("Score : "+ score, 20, 30);
      textSize(100)
      fill("white");
      text("Game Over", 175, 400);
    }
    drawSprites();
  }