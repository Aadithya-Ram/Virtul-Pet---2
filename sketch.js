//Create variables here
var dog, dogImage1, dogImage2, database, foods, foodStock 
var fedTime,lastFed; var feed,addFood; var foodObject
function preload()
{
  dogImage1 = loadImage("images/dogImg.png")
  dogImage2 = loadImage("images/dogImg1.png")
	//load images here
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database()
  foodObject = new Food()

  dog = createSprite(300,300)
  dog.addImage(dogImage1)
  dog.scale = 0.5
  foodStock = database.ref("food")
  foodStock.on("value", readStock)
    feed = createButton("Feed The Dog");
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood = createButton("Add Food");
    addFood.position(800,95)
    addFood.mousePressed(addFoods);
}


function draw() {  
  background("red")
  foodObject.display()

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
}
)
fill(255,255,254);
textSize(15);
if(lastFed>12){
  text("Last Feed :" + lastFed%12 + "PM", 350,30);
}
else if(lastFed==0){
    text("Last Fed : 12AM",350,30);
}
else {
  text("Last Feed : "+ lastFed+"AM",350,30)
}
  if(keyWentDown(UP_ARROW)){
    writeStock(foods)
    dog.addImage(dogImage2)
  }
  drawSprites();
  //add styles here
   fill("yellow")
   stroke("blue")
   text("Food Remaining"+ foods,170,170)
   text("PRESS UP ARROW TO FEED TO DOG", 200,200)
}

function readStock(data){
  foods = data.val()
}
function writeStock(A){
  if(A<= 0){
    A=0
  }
  else{A = A-1}
  database.ref("/").update(
    {
    food:A
  }
) 
}
function feedDog(){
  dog.addImage(dogImage2);

  foodObject.updateFoodstock(foodObject.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getfoodStock(),
    FeedTime:hour()
  }
 )
}
function addFoods(){
  foods++;
  database.ref('/').update({
    Food:foods
  })
}