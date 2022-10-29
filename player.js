class Player {

    constructor(w, h, ctx, keys) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
        this.keys = keys;
      
        this.x = this.canvasW * 0.08 //canvasW es el ancho que le damos en html al cnavas.

        // Posición original
        this.y0 = this.canvasH * 0.8;
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "img/player.png"
        
        this.img.frames = 5; // franjas visuales de la img
        this.img.frameIndex = 0;// ¿Que hace esto?

        this.w = 60; //Ancho de la img del sprite
        this.h = 120; //Altura de la img del sprite

        this.bullets = []

        this.vy = 1; // velocidad en la y ()
        this.setListeners();        
    }


    setListeners() {
        
        // Vincular las teclas de los controladores de teclado
        document.onkeydown = function(event) {
            
            if (
                event.keyCode === this.keys.TOP_KEY && 
                this.y === this.y0
                
                ) {
                    this.y -=5
                    this.vy -= 10;
                    console.log("Saltando")

            }  else if (

                event.keyCode === this.keys.SPACE
            ) {
                this.shoot()
            
            }
        }.bind(this)
    }

    draw(frameCounter) {
        this.ctx.drawImage(

            // Cambiando imagen del personaje
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames)-8,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

    this.animateImg(frameCounter)

        // Clear bullets
        this.bullets = this.bullets.filter((bullet) => bullet.x - bullet.r < this.canvasW )
        
        this.bullets.forEach((bullet) => {
            bullet.draw();
            bullet.move();
        })

    }

    move() {
        
        // Gravedad del salto
        let gravity = 0.4;

        if (this.y >= this.y0) {
         this.vy = 1;
         this.y = this.y0;
        } else {
            this.vy += gravity;
            this.y += this.vy;
        }
    }
  
    animateImg(frameCounter) {

        if(frameCounter % 6 === 0) {
            this.img.frameIndex--;
        }

        if(this.img.frameIndex < 0) this.img.frameIndex = 4;
    }


    shoot() {
        const bullet = new Bullet(
            this.x + this.w,
            this.y + this.h/2 ,
            this.y0,
            this.h,
            this.ctx
        )

        this.bullets.push(bullet)
    }

}