class Food{
  constructor(){
    this.milk=loadImage("Milk.png")
  }
  getFoodStock(){
    var foodStockRef=database.ref("food")
    //console.log(foodStockRef)
    foodStockRef.on("value",function(data){
      foodStock=data.val()
    })
    console.log(foodStock)
  }
  updateFoodStock(foodData){
    console.log(foodData)
    database.ref('/').update({
      'food':foodData
    })
  }
  deductFood(foodStock){
    if(foodStock<=0){
      foodStock=0
    }else{
      foodStock=foodStock-1
    }
  }
  display(){
    var x=80,y=100

    imageMode(CENTER)
    //image(this.milk,x,y,70,70)
    //console.log(foodStock)
    if(foodStock!=0){
      for(var i=0;i<foodStock;i++){
        if(i%10==0){
          x=80
          y=y+50
        }
        image(this.milk,x,y,50,50)
        x=x+30
      }
    }
  }
  bedroom(){
    background(sleep,550,500)
  }
  garden(){
    background(grass,550,500)
  }
  washroom(){
    background(wash,550,500)
  }
}