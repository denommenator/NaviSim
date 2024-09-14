
const TurnDirection = Object.freeze({
    Left: "Left",
    Right: "Right"
});

const DriveStraightDirection = Object.freeze({
    Forward: "Forward",
    Backward: "Backward"
})

class Turn
{
    constructor(degrees, turnDirection)
    {
        this.degrees = degrees
        this.turnDirection = turnDirection
    }
}

class Straight
{
    constructor(distance, driveDirection)
    {
        this.distance = distance
        this.driveDirection = driveDirection
    }
}

//let x = new Turn(90, TurnDirection.Left)
//let y = new Straight(100, DriveStraightDirection.Backward)

class Directions
{
    constructor(startPoint, startDirection)
    {
        this.startPoint = startPoint
        this.startDirection = startDirection
        this.directions = new Map()
        this.current_id = 0
    }

    add_direction(direction)
    {
        let id = get_new_id()
        this.directions.set(id, direction)
        return id
    }

    get_new_id()
    {
        let prev_id = this.current_id
        this.current_id++;
        return prev_id
    }
}


class DirectionView
{

}

