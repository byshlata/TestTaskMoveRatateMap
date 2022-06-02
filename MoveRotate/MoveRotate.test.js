const {
    moveTo3D,
    rotateTo2D,
    moveTo2D,
    matrixMultiplication
} = require("./MoveRotate");


const speed = 5;
const acceleration = 1;
const from = {x: 10, y: 10, z: 10}
const fromRotate = {x: 30, y: 40}
const to2D = {x: 40, y: 50,}
const to3D = {x: 22.5, y: 22.5, z: 22.5}
const duration = {startTime: 0, endTime: 10};

function calculateRadiiResults(resultsRotate) {
    return resultsRotate.map((m, i) => {
        return Math.round(Math.sqrt(resultsRotate[i][i][0] ** 2 + resultsRotate[i][i][1] ** 2))
    })
}

describe('Matrices', () => {


    test('should be multiplication', () => {

        const firstMatrix = [[1, 1, 1], [2, 2, 2], [3, 3, 3],]
        const secondMatrix = [[10, 10, 10], [20, 20, 20], [30, 30, 30],]
        const thirdMatrix = [[10,],]

        expect(matrixMultiplication(firstMatrix, secondMatrix)).toEqual([[60, 60, 60], [120, 120, 120], [180, 180, 180],])
        expect(matrixMultiplication(firstMatrix, thirdMatrix)).toBe(-1)
    })
})


describe('Move body', () => {


    test('should be in 2D with const speed', () => {

        const arrayCoordinates = moveTo2D(from, to2D, duration, speed,);
        const lastTimePoint = `${duration['endTime']}`;


        expect(arrayCoordinates[lastTimePoint][lastTimePoint][0]).toBe(40)
        expect(arrayCoordinates[lastTimePoint][lastTimePoint][1]).toBe(50)

    })

    test('should be in 2D with acceleration', () => {
        const arrayCoordinates = moveTo2D(from, to2D, duration, speed, acceleration);
        const lastTimePoint = `${duration['endTime']}`;

        expect(arrayCoordinates[lastTimePoint][lastTimePoint][0]).toBe(70)
        expect(arrayCoordinates[lastTimePoint][lastTimePoint][1]).toBe(90)
    })

    test('should be in 3D with const speed', () => {

        const arrayCoordinates = moveTo3D(from, to3D, duration, speed,);
        const lastTimePoint = `${duration['endTime']}`;

        expect(arrayCoordinates[lastTimePoint][lastTimePoint][0]).toBe(38.8675)
        expect(arrayCoordinates[lastTimePoint][lastTimePoint][1]).toBe(38.8675)

    })

    test('should be in 3D with acceleration', () => {
        const arrayCoordinates = moveTo3D(from, to3D, duration, speed, acceleration);
        const lastTimePoint = `${duration['endTime']}`;

        expect(arrayCoordinates[lastTimePoint][lastTimePoint][0]).toBe(67.735)
        expect(arrayCoordinates[lastTimePoint][lastTimePoint][1]).toBe(67.735)
    })

})

describe('Rotate body', () => {


    test('should be in 2D with const speed', () => {

        const arrayCoordinates = rotateTo2D(fromRotate, 1, duration, speed,);
        const arrayRadiiResults = calculateRadiiResults(arrayCoordinates)

        const arrayRadii = arrayCoordinates.map((m) => {
            return Math.round(Math.sqrt(fromRotate.x ** 2 + fromRotate.y ** 2))
        })

        expect(arrayRadiiResults).toEqual(arrayRadii)

    })

    test('should be in 2D with acceleration', () => {

        const arrayCoordinates = rotateTo2D(fromRotate, 1, duration, speed, 1);
        const arrayRadiiResults = calculateRadiiResults(arrayCoordinates)

        const arrayRadii = arrayCoordinates.map((m) => {
            return Math.round(Math.sqrt(fromRotate.x ** 2 + fromRotate.y ** 2))
        })

        expect(arrayRadiiResults).toEqual(arrayRadii)

    })

})