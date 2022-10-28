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
           
            

            this.moveAll();
            this.drawAll();

            this.clearArboles()
            this.clearEnemigos()

            if(this.isCollision()) {
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
        this.enemigos=[]; // Coleccion de Enemigos
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
            Enemigos.draw()
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
                new Enemigos(this.canvas.width, this.player.h, this.ctx)
            )
        },

    clearArboles: function() {
            this.arboles = this.arboles.filter((Arbol) => Arbol.x + Arbol.w >= 0)
        },
    clearEnemigos: function() {
            this.enemigos = this.enemigos.filter((Enemigos) => Enemigos.x + Enemigos.w >= 0)
        },

    isCollision: function() {
            console.log("COLIIISIION")
            return this.arboles.some(Arbol => {

                return (
                    
                    this.player.x + this.player.w >= Arbol.x + (Arbol.w/2)  &&
                    this.player.x < Arbol.x + (Arbol.w/2) &&
                    this.player.y + (this.player.h - 20) >= Arbol.y
                    
                    )
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