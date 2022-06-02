const {IndexedMap} = require("./IndexedMap");


let MyMap = new IndexedMap([[1, 11], [3, 13], [5, 15], [2, 13],])


describe('Class IndexMap', () => {


    beforeEach(() => {
        MyMap = new IndexedMap([[1, 11], [3, 13], [5, 15], [2, 13],]);
    })

    test('should be create', () => {

        expect(MyMap).toBeDefined()
        expect(MyMap.getKeys()).toBeDefined()
        expect(MyMap.getValues()).toBeDefined()
        expect(MyMap.getKeys()).toEqual([1, 3, 5, 2,])
        expect(MyMap.getValues()).toEqual([11, 13, 15, 13,])
    })

    test('new elements must be add', () => {

        expect(MyMap.set(1, 21).getKeys()).toEqual([1, 3, 5, 2,])
        expect(MyMap.getValues()).toEqual([21, 13, 15, 13,])
        expect(MyMap.set(4, 14).getKeys()).toEqual([1, 3, 5, 2, 4,])
        expect(MyMap.getValues()).toEqual([21, 13, 15, 13, 14,])
    })

    test('element should be taken out by key', () => {

        expect(MyMap.get(1)).toBe(11)
        expect(MyMap.get(14)).toBeNull()
    })

    test('element should be taken out by index', () => {

        expect(MyMap.getByIndex(3)).toBe(13)
        expect(MyMap.getByIndex(-10)).toBeNull()
    })

    test('element should be found by key', () => {

        expect(MyMap.has(3)).toBeTruthy()
        expect(MyMap.has(20)).toBeFalsy()
    })

    test('element should be found by index', () => {

        expect(MyMap.hasIndex(3)).toBeTruthy()
        expect(MyMap.hasIndex(20)).toBeFalsy()
    })

    test('must give size', () => {

        expect(MyMap.size()).toBe(4)
    })

    test('element should be delete', () => {

        expect(MyMap.remove(1).getKeys()).toEqual([3, 5, 2,])
        expect(MyMap.remove(17).getValues()).toEqual([13, 15, 13,])
    })

    test('element should be delete', () => {

        expect(MyMap.remove(1).getKeys()).toEqual([3, 5, 2,])
        expect(MyMap.remove(17).getValues()).toEqual([13, 15, 13,])
    })

    test('collection should be union', () => {

        const newMap = new IndexedMap([[10, {}]])

        expect(MyMap.union(newMap).getKeys()).toEqual([1, 3, 5, 2, 10,])
        expect(MyMap.getValues()).toEqual([11, 13, 15, 13, {},])
    })

    test('element should be the only collection', () => {

        expect(MyMap.unique()).toEqual([11, 13, 15,])
    })

    test('must be added element by element', () => {

        expect(MyMap.setTo(1, 4, 14).getKeys()).toEqual([1, 3, 4, 5, 2,])
        expect(MyMap.getValues()).toEqual([11, 13, 14, 15, 13,])
    })

    test('elements should remove', () => {

        expect(MyMap.removeAt(4,).getKeys()).toEqual([1, 3, 5, 2,])
        expect(MyMap.getValues()).toEqual([11, 13, 15, 13,])

        expect(MyMap.removeAt(1).getKeys()).toEqual([1, 3, 2,])
        expect(MyMap.getValues()).toEqual([11, 13, 13,])
    })

    test('forEach should work', () => {

        let array = [];
        MyMap.forEach((value, key) => {
            array.push([value, key])
        })
        const newMap = new IndexedMap(array)

        expect(newMap.getKeys()).toEqual([1, 3, 5, 2,])
        expect(newMap.getValues()).toEqual([11, 13, 15, 13,])
    })

    test('elements should be sort by value', () => {

        MyMap.sort((a, b) => a - b)
        expect(MyMap.getKeys()).toEqual([1, 2, 3, 5,])
        expect(MyMap.getValues()).toEqual([11, 13, 13, 15,])
    })


    test('elements should be sort by index', () => {

        MyMap.sortIndex((a, b) => a - b)
        expect(MyMap.getKeys()).toEqual([1, 3, 5, 2,])
        expect(MyMap.getValues()).toEqual([11, 13, 15, 13,])
    })


})