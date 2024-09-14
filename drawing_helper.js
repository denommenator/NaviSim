
class DrawingHelper{
    constructor(context, height_pixels, cm_to_pixels)
    {
        this.context = context
        this.cm_to_pixels = cm_to_pixels
        this.height_pixels = height_pixels
    }


    worldToPixelSpace(p)
    {
        let ret = new Vec2(0, 0);
        ret.x = this.cm_to_pixels * p.x
        ret.y = this.height_pixels - this.cm_to_pixels * p.y
        return ret
    }

    drawLinePixels(p_0_pixel, p_1_pixel)
    {
        this.context.save();
        this.context.strokeStyle = "rgb(255 255 255)";
        this.context.beginPath();
        this.context.moveTo(p_0_pixel.x, p_0_pixel.y);
        this.context.lineTo(p_1_pixel.x, p_1_pixel.y);
        this.context.stroke();
        this.context.restore();
        // console.log(p_0_pixel.x, p_0_pixel.y)
        // console.log(p_1_pixel.x, p_1_pixel.y)
        
    }

    drawLine(p_0, p_1)
    {
        this.drawLinePixels(this.worldToPixelSpace(p_0), this.worldToPixelSpace(p_1))
    }

}