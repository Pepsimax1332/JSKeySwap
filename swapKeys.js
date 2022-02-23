/**
 *  Class that will swap and change the capitilasation of keys in objects
 */
class KeySwapper {
    /**
     * @param {'object'} data the Object containing the dat for which to switch the keys out.
     * @param {'object'} swapKeys the keys to swap to associated values.
     * @param {'object'} reveresed boolean to determine if key value pairs of swap keys are switched.
     */
    constructor(data, swapKeys, reversed=false) {
        this.data = data;
        this.swapKeys = reversed ? this.reverseKeys(swapKeys) : swapKeys;
        this.reversed = reversed;
    }

    reverseKeys(keys) {
        return Object.entries(keys).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc
        }, {});
    }

    /**
     * Method used to swap keys in object, can be set to reverse mode to change the direction of the swap
     * 
     * @returns a new object with swapped keys
     */
    swap() {
        return this.swapper(this.data);
    }

    /**
     * Method to swap a key for another. This method will automatically de-capitalize or capitalize depending on if 
     * reversed is used. If reversed is used an inverse swap will take place swapping the value for the key inside 
     * swap. If key is not in swap this method will just de-capitalize or capitalize the key besed on the value of 
     * reversed.
     * 
     * @param { string } key The key to swap
     * @returns The swapped key.
     */
    swapKey(key) {
        const newKey = key in this.swapKeys ? this.swapKeys[key] : key;
        const firstChar = (this.reversed ? newKey[0].toUpperCase() : newKey[0].toLowerCase())
        return `${firstChar}${newKey.slice(1)}`;
    }

    /**
     * Method that recursivly walks through object and swaps keys as needed. 
     * 
     * @param {'object'} data The data needed to have keys swapped. If data is an array the method will recurse
     *                   through the array. If data is an object, the key will be swapped before recursing accross 
     *                   the value. If the data is a primative it will return that data.
     * @returns an object with keys swapped if needed and all key capitalisation changed to match need.
     */
    swapper(data) {
        // Base Case 1 --- Is a primative (aka not an array or object)
        if (data !== Object(data) && !Array.isArray(data)) return data;
        // Base Case 2 --- If data is an array map over elements and recurse
        if (Array.isArray(data)) return data.map((elem) => this.swapper(elem));
        // else must be an object, reduce accross aobject and recurse across values
        return Object.entries(data).reduce((obj, [key, value]) => {
            obj[this.swapKey(key)] = this.swapper(value);
            return obj;
        }, {});
    }
}

module.exports = KeySwapper;
