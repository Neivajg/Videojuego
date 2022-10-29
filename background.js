class Background {
    constructor(w, h, ctx) {
        this.ctx = ctx;
        this.w = w;
        this.h = h;

        this.img = new Image();
        this.img.src = "img/background.jpg"

        this.x = 0;
        this.y = 0;
        
        // desplazamiento
        this.dx = 15;//añadimos el desplazamineto (Velocidad)
    }
    
    draw() { //Se añaden dos contectos porque es como si hubiera dos imagenes que van corriendo 
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.img,
            this.x + this.w, // la segunda imagen empiez donde acaba la primera 
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.x -= this.dx
        
        if( this.x < -this.w) this.x = 0;
    }
}