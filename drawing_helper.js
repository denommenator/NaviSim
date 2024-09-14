
class DrawingHelper{
    constructor(context)
    {
        this.context = context
    }

    drawLine(p_0, p_1)
    {
        this.context.save();
        this.context.beginPath();
        this.context.moveTo(p_0.x, p_0.y);
        this.context.lineTo(p_1.x, p_1.y);
        this.context.stroke();
        this.context.restore();
    }


}