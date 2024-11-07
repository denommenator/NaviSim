
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
        this.context.strokeStyle = "rgba(43, 94, 82, 0.7)";
        this.context.lineWidth = 4;
        this.context.beginPath();
        this.context.moveTo(p_0_pixel.x, p_0_pixel.y);
        this.context.lineTo(p_1_pixel.x, p_1_pixel.y);
        this.context.stroke();
        this.context.restore();
        // console.log(p_0_pixel.x, p_0_pixel.y)
        // console.log(p_1_pixel.x, p_1_pixel.y)
        
    }

    drawImage(p, rotationDegrees, image, scale, rotCenterX, rotCenterY)
    {
        this.context.save()

        let pixelWidth = scale * image.naturalWidth
        let pixelHeight = scale * image.naturalHeight

        let bottomLeftX = scale * rotCenterX
        let bottomLeftY = scale * rotCenterY

        let p_pixel_space = this.worldToPixelSpace(p)
        this.context.translate(p_pixel_space.x, p_pixel_space.y)
        this.context.rotate(- Math.PI / 180 * rotationDegrees)

        this.context.drawImage(image, -bottomLeftX, -bottomLeftY, pixelWidth, pixelHeight)
        this.context.restore()
    }

    drawLine(p_0, p_1)
    {
        this.drawLinePixels(this.worldToPixelSpace(p_0), this.worldToPixelSpace(p_1))
    }

}