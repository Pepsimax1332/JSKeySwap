/**
 *  Class that will swap and change the capitilasation of keys in objects
 */
class KeySwapper {
    /**
     * @param {'object'} data the Object containing the dat for which to switch the keys out.
     * @param {'object'} swapKeys the keys to swap to associated values.
     */
    constructor(data, swapKeys) {
        this.data = data;
        this.swapKeys = swapKeys;
        this.reveresedSwapKeys = Object.entries(swapKeys).reduce((acc, [key, value]) => (acc[value] = key, acc), {});
    }

    /**
     * Method used to swap keys in object, can be set to reverse mode to change the direction of the swap
     * 
     * @param { boolean } reversed set to true to reverse the swap, this will have the effect of inverting the swapping process
     *                     by capitalising the keys, and using an inverted swap object.
     * 
     * @returns a new object with swapped keys
     */
    swap(reversed=false) {
        return reversed ? this.swapper(this.data, this.reveresedSwapKeys, reversed) : this.swapper(this.data, this.swapKeys, reversed)
    }

    /**
     * Method that recursivly walks through object and swaps keys as needed. 
     * 
     * @param {'object'} data The data needed to have keys swapped. If data is an array the method will recurse
     *                   through the array. If data is an object, the key will be swapped before recursing accross the value. If the data
     *                   is a primative it will return that data.
     * @param {'object'} swap The key value pairs to be swapped.
     * @param {boolean} reversed set to true to reverse the polarity of the key swap. Will capitalise returned result and using inverted
     *                  key value pairs to swap.
     * @returns an object with keys swapped if needed and all key capitalisation changed to match need.
     */
    swapper(data, swap, reversed) {
        // base case if data is primative or empty list then return data
        if (data !== Object(data) || (Array.isArray(data) && data.length === 0)) {
            return data;
        }
        // reduces accross the object to create a new one with formatted/swapped keys
        return Object.entries(data).reduce((obj, [key, value]) => {

            // if data is an array then map swapper recursivly accross all entries in array
            if (Array.isArray(data)) {
                return data.map((entry) => this.swapper(entry, swap, reversed));
            // else if data is an object perform the key swap if it exists and capitalise as needed recursing accross the value
            } else if (data === Object(data)) {
                let newKey = key in swap ? swap[key] : key;
                newKey = `${(reversed ? newKey[0].toUpperCase() : newKey[0].toLowerCase())}${newKey.slice(1)}`;

                obj[newKey] = this.swapper(value, swap, reversed);
                return obj;
            } 
        }, {});
    }
}

module.exports = KeySwapper;
