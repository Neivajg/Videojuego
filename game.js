const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60,
    keys: {
        TOP_KEY: 38, // ¿como buscar los numeros para enlazar el teclado ?     
        //https://css-tricks.com/snippets/javascript/javascript-keycodes/
        //SI PONES ESTO EN CONSOLA Y LE DAS AL TECLADO NUMEROS Y LETRAS TE PONE EL NUMERO QUE PERTENECE A ESA TECLA
        // document.addEventListener("keydown", function(event) {
        //   console.log(event.which);
        // })

        SPACE: 32
    },

    init: function () {
        console.log("Cargado")
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext("2d");
        
        ScoreBoard.init(this.ctx);

        this.start()
    },

    start: function() {
        console.log("Empezando juego")
       

        this.reset();
        
        
        // Loop del juego

        this.interval = setInterval(() => {

            // frameCounter es el mecanismo para programar acciones periodicas por ejemplo cada 50 frame genera un obtaculo o cada 6 frame cambia el skin del personaje
            this.frameCounter++;

            this.score += 0.01;

            if(this.frameCounter > 1000) {
                this.frameCounter = 0;
            }

            if(this.frameCounter % 80 === 0 && Math.floor(Math.random()*2) == 1) { 
                 this.generateArbol()

            } 
            if(this.frameCounter % 100 === 0 && Math.floor(Math.random()*2) == 1 ) { 
                this.generateEnemigos()

           } 

        //     if(this.frameCounter % 30 === 0 ) { 
        //         this.generateOctalulosALt()

        //    } 
           
            

            this.moveAll();
            this.drawAll();

            this.clearArboles()
            this.clearEnemigos()

           
            this.isShoot()

            if( this.isColisionWithGueisa()) {
                console.log("aaaaaaaaaaaaaaaaaaa")
                 this.gameOver();
            }

            if(this.isColisionWithBox()) {
                this.gameOver();
           }


            

        }, 1000 / this.fps)

    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx)
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        this.scoreBoard = ScoreBoard
        this.score = 0;
        this.arboles = []; // Coleccion de Cajas
        // this.octaculos=[]
        this.enemigos= []; // Coleccion de Enemigos
        this.scoreBoard = ScoreBoard;
        this.frameCounter = 0
    },

    moveAll: function() {
        this.background.move()
        this.player.move()
        this.arboles.forEach(Arbol=>{
            Arbol.move()
        })
        this.enemigos.forEach(Enemigos=>{
            Enemigos.move()
        })

    },

    drawAll: function() {
    
        this.background.draw()

        this.player.draw(this.frameCounter)

        this.arboles.forEach(Arbol=>{
            Arbol.draw()
        })
       
       this.enemigos.forEach(Enemigos=>{
            Enemigos.draw(this.frameCounter)
        })

        this.drawScore();
    },

    stop: function() {
        clearInterval(this.interval)
    },

    //CREACIÓN CAJAS Y ENEMIGOS
    generateArbol: function() {
            this.arboles.push(
                new Arbol(this.canvas.width, this.player.y0, this.player.h, this.ctx)
            );
        },
  
    generateEnemigos: function() {
            this.enemigos.push(//w, h, ctx
                new Enemigos(this.canvas.width, this.canvas.height, this.ctx)
            )
        },

    clearArboles: function() {
            this.arboles = this.arboles.filter((Arbol) => Arbol.x + Arbol.w >= 0)
        },
    
    clearEnemigos: function() {
            this.enemigos = this.enemigos.filter((Enemigos) => Enemigos.x + Enemigos.w >= 0)
        },

    // COLISION PLAYER - CAJA
    isColisionWithBox: function() {
            return this.arboles.some(Arbol => {
                return (
                    this.player.x + this.player.w >= Arbol.x + 20 &&
                    this.player.x < Arbol.x + Arbol.w &&
                    this.player.y + (this.player.h - 20) >= Arbol.y 
                    )
            })
        },



        // COLISION PLAYER - GUEISA

        // - 1. La llamada al metodo de la colision en el loop
        // - 2. El metodo de la colision

        isColisionWithGueisa: function () {
            return this.enemigos.some(Enemigo => {
             return (
                    this.player.x + this.player.w >= Enemigo.x + 20 &&
                    this.player.x < Enemigo.x + Enemigo.w &&
                    this.player.y + (this.player.h - 20) >= Enemigo.y 
                  )
             })
    },



       
        // COLISION BULLET - GUEISA
        isShoot: function() {
            return this.enemigos.some(Enemigo => {
                    return this.player.bullets.some(bullet =>{
                            const result = (
                                bullet.x + bullet.r >= Enemigo.x && 
                                bullet.x - bullet.r <= Enemigo.x + Enemigo.w &&
                                bullet.y + bullet.r >=  Enemigo.y &&
                                bullet.y - bullet.r <= Enemigo.y + Enemigo.h
                                    )
                            
                            if (result) {
                                this.enemigos = this.enemigos.filter(e => e !== Enemigo)
                                this.player.bullets = this.player.bullets.filter(b => b !== bullet)
                            }

                            return result
                    })

            })
        },


    gameOver: function() {
        console.log("game OV")
        this.stop();

        if(confirm("GAME OVER. JUEGAS DE NUEVO?")) {
            this.reset();
            this.start();
        }
    },

    drawScore: function() {
        this.scoreBoard.update(this.score)
    }

}