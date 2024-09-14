class Vec2
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
    }

    copy()
    {
        return new Vec2(this.x, this.y)
    }

    plus_equals(other)
    {
        this.x += other.x
        this.y += other.y
    }

    minus_equals(other)
    {
        this.x -= other.x
        this.y -= other.y
    }

    scale(s)
    {
        this.x *= s
        this.y *= s
    }

    norm()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalized()
    {
        ret = this.copy()
        ret.scale(1 / this.norm())
        return ret
    }

    static add(v, w)
    {
        let ret = v.copy()
        ret.plus_equals(w)
        return ret
    }

    static sub(v, w)
    {
        let ret = v.copy()
        ret.minus_equals(w)
        return ret
    }

    static scale(s, v)
    {
        let ret = v.copy()
        ret.scale(s)
        return ret
    }

}
