class Food{
    constructor(){
      this.foodStock = 0
      this.lastfed
      this.image = loadImage("images/Milk.png")
    }
    updateFoodstock(foodStock){
        this.foodStock = foodStock
    }
    getfedtime(lastfed){
      this.lastfed = lastfed
    }
    detectfood(){
      if(this.foodStock>0){
        this.foodStock--
      }
    }
    getfoodStock(){
      return(this.foodStock)
    }
    display(){
      var x = 80, y=80
      imageMode(CENTER)
      image(this.image,500,300,50,50)
      if(this.foodStock!==0){
        for(var i = 0; i<this.foodStock;i++){
          if(i%10===0){
            x=80, y=y+50
          }
          image(this.image,x,y,50,50)
          x = x+30
        }
      }
    }
}