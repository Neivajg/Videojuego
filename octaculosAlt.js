class ObtaculosAlt{
    
    constructor(canvasW, playerY, playerH,ctx) {

        this.ctx = ctx;
        
        this.w =60 ;
        this.h = 80;

        this.img = new Image();
        this.img.src = "img/Zombie1.gif"

        this.x = canvasW;
    
        this.y = this.canvasH * 0.2;

        this.dx=15;     
    }
     
    draw(){
        console.log("Pinta obtaculosAlt")
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