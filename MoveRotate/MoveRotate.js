const INDEXING_TIME_INTERVAL = 1;
const ROUNDING_ACCURACY = 10000;


function matrixMultiplication(a, b) {

    if (a[0].length !== b.length) {
        return -1
    }
    let matrixMulti = [];

    for (let i = 0; i < a.length; i++) {
        let matrixRow = []

        for (let j = 0; j < b[0].length; j++) {
            let elemMatrixRow = 0;

            for (let k = 0; k < a[0].length; k++) {
                elemMatrixRow += a[i][k] * b[k][j]
            }
            matrixRow.push(elemMatrixRow)
        }
        matrixMulti.push(matrixRow)
    }
    return matrixMulti
}

function roundingNumber(value) {
    return Math.trunc(value * ROUNDING_ACCURACY) / ROUNDING_ACCURACY
}

function moveTo2D(from, to, duration, speed, acceleration = 0) {

    const INDEX_COS = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2)
    const DIRECTION_COS_X = (to.x - from.x) / INDEX_COS
    const DIRECTION_COS_Y = (to.y - from.y) / INDEX_COS
    const START_VECTOR = [[from.x], [from.y], [1]]
    let xi, yi;
    let arrayCoordinates = [];
    let startTimePoint = 0;

    while (duration.startTime + startTimePoint <= duration.endTime) {

        let timePoint = startTimePoint + duration.startTime
        let currentDistance = ((speed + acceleration * timePoint / 2) * timePoint)

        let matrixCurrentDistance = [
            [1, 0, DIRECTION_COS_X * currentDistance],
            [0, 1, DIRECTION_COS_Y * currentDistance],
            [0, 0, 1]
        ]

        let currentCoordinate = matrixMultiplication(matrixCurrentDistance, START_VECTOR)

        xi = roundingNumber(currentCoordinate[0][0])
        yi = roundingNumber(currentCoordinate[1][0])
        timePoint = roundingNumber(timePoint)
        startTimePoint += INDEXING_TIME_INTERVAL
        arrayCoordinates.push({[timePoint]: [xi, yi]})
    }

    return arrayCoordinates
}



function moveTo3D(from, to, duration, speed, acceleration = 0) {

    const INDEX_COS = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2 + (from.z - to.z) ** 2)
    const DIRECTION_COS_Z = (to.z - from.z) / INDEX_COS
    const DIRECTION_COS_X = (to.x - from.x) / INDEX_COS
    const DIRECTION_COS_Y = (to.y - from.y) / INDEX_COS
    const START_VECTOR = [[from.x], [from.y], [from.z], [1]]

    let xi, yi, zi;
    let arrayCoordinates = [];
    let startTimePoint = 0;


    while (duration.startTime + startTimePoint <= duration.endTime) {

        let timePoint = startTimePoint + duration.startTime
        let currentDistance = ((speed + acceleration * timePoint / 2) * timePoint)

        let matrixCurrentDistance = [
            [1, 0, 0, DIRECTION_COS_X * currentDistance,],
            [0, 1, 0, DIRECTION_COS_Y * currentDistance,],
            [0, 0, 1, DIRECTION_COS_Z * currentDistance,],
            [0, 0, 0, 1,],
        ]

        let currentCoordinate = matrixMultiplication(matrixCurrentDistance, START_VECTOR)

        xi = roundingNumber(currentCoordinate[0][0])
        yi = roundingNumber(currentCoordinate[1][0])
        zi = roundingNumber(currentCoordinate[2][0])
        timePoint = roundingNumber(timePoint)
        startTimePoint += INDEXING_TIME_INTERVAL
        arrayCoordinates.push({[timePoint]: [xi, yi, zi]})
    }

    return arrayCoordinates
}




function rotateTo2D(from, direction, duration, speed, acceleration = 0) {


    let xi, yi;
    let arrayCoordinates = [];
    let startTimePoint = 0;
    let INDEX_DIRECTION = direction > 0 ? 1 : -1


    while (duration.startTime + startTimePoint <= duration.endTime) {


        let timePoint = startTimePoint + duration.startTime;
        let angleFi = ((speed + acceleration * timePoint / 2) * timePoint);

        let cosFi = Math.cos(angleFi);
        let sinFi = Math.sin(angleFi);

        let matrixCurrentAngle = [
            [cosFi, INDEX_DIRECTION * (-sinFi)],
            [INDEX_DIRECTION * sinFi, cosFi],
        ]

        let currentCoordinate = matrixMultiplication(matrixCurrentAngle, [[from.x], [from.y]]);

        xi = roundingNumber(currentCoordinate[0][0]);
        yi = roundingNumber(currentCoordinate[1][0]);
        timePoint = roundingNumber(timePoint);
        startTimePoint += INDEXING_TIME_INTERVAL;
        arrayCoordinates.push({[timePoint]: [xi, yi]});
    }

    return arrayCoordinates

}

module.exports = {moveTo2D, moveTo3D, rotateTo2D, matrixMultiplication}