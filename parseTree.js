function parseTree(swap, data) {

    function parse(data) {
        if (Array.isArray(data)) {
            data.forEach(element => {
                element = parse(element);
            });
        } else if (typeof(data) === 'object'){
            Object.keys(data).forEach(key => {
                if (key in swap) {
                    data[swap[key]] = data[key]
                    delete data[key];
                } else {
                    data[key] = parse(data[key]);
                }
            });
        }
        return data;
    }
    return parse(data);
}

function reverseKeys(swap) {
    return Object.entries(swap)
        .reduce((acc, [key, value]) => (acc[value] = key, acc), {});
}

exports.parseTree = parseTree;
exports.reverseKeys = reverseKeys;