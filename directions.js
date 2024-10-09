const DirectionType = Object.freeze({
    Turn: "Turn",
    Drive: "Drive"
});

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
        this.type = DirectionType.Turn
    }
}

class Straight
{
    constructor(distance, driveDirection)
    {
        this.distance = distance
        this.driveDirection = driveDirection
        this.type = DirectionType.Drive
    }
}

//let x = new Turn(90, TurnDirection.Left)
//let y = new Straight(100, DriveStraightDirection.Backward)

class Directions
{
    constructor(startPoint, startAngleRadians)
    {
        this.startPoint = startPoint
        this.startAngleRadians = startAngleRadians
        this.directions = []
    }

    push_direction(direction)
    {
        this.directions.push(direction)
    }

    edit_direction(id, direction)
    {
        this.directions[id] = direction
    }

    get_direction(id)
    {
        return this.directions[id]
    }

    count()
    {
        return this.directions.length
    }
}


function drawDirections(directions, drawing_helper)
{
    let currentAngle = directions.startAngleRadians
    let currentPosition = directions.startPoint

    let previousPosition = currentPosition

    let i = 0
    while(i < directions.count())
    {
        let currentDirection = directions.get_direction(i)

        if(currentDirection.type == DirectionType.Turn)
        {
            
            let sign = ((currentDirection.turnDirection == TurnDirection.Left) ? 1 : -1)
            currentAngle += sign * currentDirection.degrees
            console.log('new heading: ', currentAngle)
        }
        else
        {
            let heading = new Vec2(Math.cos(currentAngle), Math.sin(currentAngle))
            let sign = ((currentDirection.driveDirection == DriveStraightDirection.Forward) ? 1 : -1)
            let nextPosition = Vec2.add(currentPosition, Vec2.scale(sign, Vec2.scale(currentDirection.distance, heading)))

            drawing_helper.drawLine(currentPosition, nextPosition)

            console.log('new location: ', nextPosition.x, nextPosition.y)

            currentPosition = nextPosition
        }
        
        i++

    }
}

