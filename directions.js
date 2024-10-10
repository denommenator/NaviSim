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
    constructor(startPoint, startAngle)
    {
        this.startPoint = startPoint
        this.startAngle = startAngle
        this.directions = []
    }

    push_direction(direction)
    {
        this.directions.push(direction)
    }

    pop_direction()
    {
        this.directions.pop()
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
    let degreesToRadians = Math.PI / 180
    let currentAngle = directions.startAngle
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
        }
        else
        {
            let heading = new Vec2(Math.cos(degreesToRadians * currentAngle), Math.sin(degreesToRadians * currentAngle))
            let sign = ((currentDirection.driveDirection == DriveStraightDirection.Forward) ? 1 : -1)
            let nextPosition = Vec2.add(currentPosition, Vec2.scale(sign, Vec2.scale(currentDirection.distance, heading)))

            drawing_helper.drawLine(currentPosition, nextPosition)

            currentPosition = nextPosition
        }
        
        i++

    }
}

function serializeDriveStraight(direction)
{
    if(direction.driveDirection == DriveStraightDirection.Forward)
    {
        return 'Drive forward: ' + direction.distance + ' cm'
    }
    else
    {
        return 'Drive backward: ' + direction.distance + 'cm'
    }
}

function serializeTurn(direction)
{
    if(direction.turnDirection == TurnDirection.Left)
    {
        return 'Turn left: ' + direction.degrees + ' degrees'
    }
    else
    {
        return 'Turn right: ' + direction.degrees + 'degrees'
    }
}

function serializeDirection(direction)
{
    if(direction.type == DirectionType.Drive)
    {
        return serializeDriveStraight(direction)
    }
    else if (direction.type == DirectionType.Turn)
    {
        return serializeTurn(direction)
    }
    else
        return ''
}

function serializeDirections(directions, displayParagraph)
{
    displayParagraph.appendChild(document.createTextNode('Start position: (' + directions.startPoint.x + ', ' + directions.startPoint.y + ')'))
    displayParagraph.appendChild(document.createElement("br"))

    displayParagraph.appendChild(document.createTextNode('Start angle: ' + directions.startAngle))
    displayParagraph.appendChild(document.createElement("br"))

    for (const direction of directions.directions) 
    {
        displayParagraph.appendChild(document.createTextNode('+' + serializeDirection(direction)))
        displayParagraph.appendChild(document.createElement("br"))
    }

}

class RobotTracker
{
    constructor(straight_speed, rotation_speed)
    {
        this.straight_speed=straight_speed
        this.rotation_speed=rotation_speed
    }

    timeForTurn(direction)
    {
        return direction.degrees / this.rotation_speed
    }

    timeForDriveStraight(direction)
    {
        return direction.distance / this.straight_speed
    }

    timeForDirection(direction)
    {
        if(direction.type == DirectionType.Drive)
        {
            return this.timeForDriveStraight(direction)
        }
        else if (direction.type == DirectionType.Turn)
        {
            return this.timeForTurn(direction)
        }
    }

    get_location_rotation(directions, time)
    {
        let currentLocation = directions.startPoint
        let currentAngle = directions.startAngle

        let nextLocation = currentLocation
        let nextAngle = currentAngle

        let t = 0

        let degreesToRadians = Math.PI / 180
        for(const currentDirection of directions.directions)
        {
            if(currentDirection.type == DirectionType.Turn)
            {
                
                let sign = ((currentDirection.turnDirection == TurnDirection.Left) ? 1 : -1)
                nextLocation = currentLocation
                nextAngle = currentAngle + sign * currentDirection.degrees

            }
            else
            {
                let heading = new Vec2(Math.cos(degreesToRadians * currentAngle), Math.sin(degreesToRadians * currentAngle))
                let sign = ((currentDirection.driveDirection == DriveStraightDirection.Forward) ? 1 : -1)
                nextLocation = Vec2.add(currentLocation, Vec2.scale(sign, Vec2.scale(currentDirection.distance, heading)))
                nextAngle = currentAngle
            }
            

            let direction_time = this.timeForDirection(currentDirection)
            if(t + direction_time < time)
            {
                currentLocation = nextLocation
                currentAngle = nextAngle
                t += direction_time
            }
            else
            {
                let ret = new Object()

                let direction_completion_ratio = (time - t) / direction_time
                let s = direction_completion_ratio
                ret.angle = (1 - s) * currentAngle + s * nextAngle

                ret.location = Vec2.add(Vec2.scale(1 - s, currentLocation), Vec2.scale(s, nextLocation))
                
                return ret
            }
        }
        let ret = new Object()
            ret.angle = currentAngle
            ret.location = currentLocation
            return ret
    }
}