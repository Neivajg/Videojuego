const ScoreBoard = {

    ctx: undefined,
    init: function(ctx) {
        ctx.font = "35px sans-serif";
        this.ctx = ctx;
    },

    update: function(score) {
        this.ctx.fillStyle = "White";
        this.ctx.fillText(Math.floor(score), 50 , 50)
    }

}