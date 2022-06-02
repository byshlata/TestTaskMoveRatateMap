class IndexedMap {
    #keys = [];
    #values = [];

    static bubbleSort(arrayKeys, arrayValues, callback, isIndex) {
        for (let i = 0; i < arrayKeys.length - 1; i++) {
            let isFlag = true;
            for (let j = 0; j < arrayKeys.length - i; j++) {

                let callbackValue = isIndex
                    ? callback(j, j + 1)
                    : callback(arrayKeys[j], arrayKeys[j + 1], arrayValues[j], arrayValues[j + 1])

                if (callbackValue > 0) {
                    [arrayKeys[j], arrayKeys[j + 1]] = [arrayKeys[j + 1], arrayKeys[j]];
                    [arrayValues[j], arrayValues[j + 1]] = [arrayValues[j + 1], arrayValues[j]]
                    isFlag = false;
                }
            }
            if (isFlag) break;
        }
    }

    constructor(iterable = null) {
        if (iterable) {
            for (const [key, value] of iterable) {
                this.set(key, value)
            }
        }
    }

    set(key, value) {
        if (this.#keys.includes(key)) {
            const index = this.#keys.indexOf(key)
            this.#values[index] = value
        } else {
            this.#keys.push(key)
            this.#values.push(value)
        }
        return this
    }

    get(key) {
        if (this.#keys.includes(key)) {
            const index = this.#keys.indexOf(key)
            return this.#values[index]
        }
        return null
    }

    getByIndex(index) {
        if (this.#keys.length > index && index > 0) {
            return this.#values[index]
        }
        return null
    }

    has(key) {
        return this.#keys.includes(key)
    }

    hasIndex(index) {
        if (index > 0) {
            return this.#keys.length > index
        }
        return false
    }

    size() {
        return this.#keys.length
    }

    remove(key) {
        if (this.#keys.includes(key)) {
            const index = this.#keys.indexOf(key)
            this.#keys.splice(index, 1)
            this.#values.splice(index, 1)
            return this
        }
        return this
    }

    getKeys() {
        return this.#keys
    }

    getValues() {
        return this.#values
    }

    union(maps) {
        this.#keys.push(...maps.getKeys())
        this.#values.push(...maps.getValues())
        return this
    }

    unique() {
        return Array.from(new Set(this.#values))
    }

    uniqueKeys() {
        return this.#keys
    }

    setTo(index, key, value) {
        this.#keys.splice(index + 1, 0, key)
        this.#values.splice(index + 1, 0, value)
        return this
    }

    removeAt(index, count = 1) {
        this.#keys.splice(index + 1, count)
        this.#values.splice(index + 1, count)
        return this
    }

    forEach(callback) {

        for (let index = 0; index < this.#keys.length; index++) {
            callback(this.#keys[index], this.#values[index], index)
        }
        return this
    }

    sort(callback) {
        IndexedMap.bubbleSort(this.#keys, this.#values, callback, false)
    }

    sortIndex(callback) {
        IndexedMap.bubbleSort(this.#keys, this.#values, callback, true)
    }

}


module.exports = {IndexedMap}