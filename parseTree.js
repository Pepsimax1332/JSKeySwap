/**
 * function that takes an object of keys to swap out.
 * 
 * @param {*} data the Object containing the dat for which to switch the keys out.
 * @param {*} swap the keys to swap to associated values
 * 
 * @returns object with swapped keys contained in swap.
 */
function parseTree(swap, data) {

    function parse(data) {
        // If the data is an array itterate through the array and recurse through structure
        if (Array.isArray(data)) {
            data.forEach(element => {
                element = parse(element);
            });
        // if the data is an object then iterate through each key.
        } else if (typeof(data) === 'object'){
            Object.keys(data).forEach(key => {
                // if key needs to be swapped swap the key recurse down data structure 
                // and delete the old entry.
                if (key in swap) {
                    data[swap[key]] = parse(data[key])
                    delete data[key];
                // else recurse down the rest of the structure
                } else {
                    data[key] = parse(data[key]);
                }
            });
        }
        // base case return anything else
        return data;
    }
    return parse(data);
}
/**
 * swaps keys and values in object
 * 
 * @param {*} swap an object containing the keys and values to swap
 * @returns an object with key values swapped
 */
function reverseKeys(swap) {
    return Object.entries(swap)
        .reduce((acc, [key, value]) => (acc[value] = key, acc), {});
}

exports.parseTree = parseTree;
exports.reverseKeys = reverseKeys;
