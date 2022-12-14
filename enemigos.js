class Enemigos {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
        this.x = this.canvasW 
        this.y = this.canvasH * 0.78;

        this.img = new Image();
        this.img.src = "img/enemy.png"
        
        this.img.frames = 8; // franjas visuales de la img
        this.img.frameIndex = 0;

        this.w = 100; //Ancho de la img del sprite
        this.h = 180; //Altura de la img del sprite

        this.dx = 20;
    }

    draw(frameCounter) {
        this.ctx.drawImage(

            // Cambiando imagen del personaje
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.animateImg(frameCounter)
    }

   move(){
        this.x -= this.dx;
    }
    animateImg(frameCounter) {

        if(frameCounter % 8 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 7) this.img.frameIndex = 0;
    }


}
