//Create variables here

var dog
var happyDog
var database
var foodS
var foodStock
var lastFed
var sleep
var grass
var wash
var gameState=0
var sad

function preload()
{
  //load images here
  dog=loadImage("dogImg.png")
  happyDog=loadImage("dogImg1.png")
  sleep=loadImage("Bed Room.png")
  grass=loadImage("Garden.png")
  wash=loadImage("Wash Room.png")
  sad=loadImage("sadDog.png")
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database()

  doge=createSprite(750,250,10,10)
  doge.scale=0.3

  food1=new Food()

  readState=database.ref('gameState')
  readState.on("value",function(data){
    gameState=data.val()
  })

  feed=createButton("Feed the dog")
  feed.position(600,30)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,30)
  addFood.mousePressed(addFoods)

  food1.getFoodStock()
  //foodStock.on("value",readStock)
}

function draw() {  
  background(46,139,87)

  console.log(foodStock)

  currentTime=hour()
  if(currentTime==(lastFed+1)){
    update("playing")
    food1.garden()
  }else if(currentTime==(lastFed+2)){
    update("sleeping")
    food1.bedroom()
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("bathing")
    food1.washroom()
  }else {
    update("Hungry")
    doge.addImage(dog)
    food1.display()
  }
  //food1.updateFoodStock(foodStock)
  //food1.deductFood()

  drawSprites();
  lastFedRef=database.ref("lastEaten")
  lastFedRef.on("value",function(data){
    lastFed=data.val()
  })
  //add styles here
  fill("white")

  if(gameState!=="Hungry"){
    feed.hide()
    addFood.hide()
  }else{
    feed.show()
    addFood.show()
    //doge.addImage(dog)
  }

  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12+" PM",350,40)
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,40)
  }else{
    text("Last Feed : "+ lastFed + " AM",350,40)
  }

  //text("Note: press UP_ARROW Key To Feed Drago Milk!",100,40)
}

function feedDog(){
  doge.addImage(happyDog)
  foodStock--
  //food1.updateFoodStock(foodStock)
  database.ref('/').update({
    food:foodStock,
    lastEaten:hour()
  })
    update("not Hungry")
}

function addFoods(){
  foodStock++
  database.ref('/').update({
    food:foodStock
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}