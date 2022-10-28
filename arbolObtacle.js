class Arbol{
    
    constructor(canvasW, playerY,playerH,ctx) {

        this.ctx = ctx;
        
        this.w =60 ;
        this.h = 80;

        this.img = new Image();
        this.img.src = "img/cajaa.png"

        this.x = canvasW;
    
        this.y = playerY + (playerH - this.h) - 10;

        this.dx=15;     
    }
     
    draw(){
        console.log("Pinta obtaculos")
        this.ctx.drawImage(
           
            this.img,
            this.x,
            this.y,
            this.w,
            this.h                   
        )
    }

    move(){
        this.x -= this.dx;
    }

}