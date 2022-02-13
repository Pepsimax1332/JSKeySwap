parseTree = require('../modules/parseTree');

describe('Testing Parse tree to swap keys', () => {

    const key2swap = {
        a: 'aa'
    };

    const keys2swap = {
        a: 'aa',
        b: 'bb',
    }

    test('primative value that is different from key to be swapped should not change', () => {
        data = 'b';
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(data);
    });

    test('primative value that is same as key to be swapped should not change', () => {
        data = 'a';
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(data);
    });

    test('empty array should not change', () => {
        data = [];
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(data);
    }) 

    test('array containing primative containing key to be swapped should not change', () => {
        data = ['a'];
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(data);
    })

    test('array containing multiple primatives with key values to be swapped should not change', () => {
        data = ['a', 'a', 'b'];
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(data);
    })

    test('Object with key to be swapped should be changed', () => {
        data = { a: "a" };
        expected = { aa: "a" };
        swapped = parseTree.parseTree(key2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('Object with multiple matching keys to be swapped should be changed', () => {
        data = { a: "a" , b: "b" };
        expected = { aa: "a" , bb: "b" };
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('Only matching keys to be swapped should be changed', () => {
        data = { a: "a" , b: "b", c:'c' };
        expected = { aa: "a" , bb: "b", c:'c' };
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('nested objects in lists should have keys changed', () => {
        data = [
            { a: "a1" , b: "b1", c: 'c1'},
            { a: "a2" , b: "b2", c: 'c2'},
        ];
        expected = [
            { aa: "a1" , bb: "b1", c: 'c1'},
            { aa: "a2" , bb: "b2", c: 'c2'},
        ];
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('nested objects in objects should have keys changed', () => {
        data = {
            obj1: { a: "a1" , b: "b1", c: 'c1'},
            obj2: { a: "a2" , b: "b2", c: 'c2'},
        };
        expected = {
            obj1: { aa: "a1" , bb: "b1", c: 'c1'},
            obj2: { aa: "a2" , bb: "b2", c: 'c2'},
        };
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('nested objects containing objetcs in arrays should have keys changed', () => {
        data = { 
            obj1: [
                { a: "a1" , b: "b1", c: 'c1'},
                { a: "a2" , b: "b2", c: 'c2'},
            ],
            obj2: [
                { a: "a1" , b: "b1", c: 'c1'},
                { a: "a2" , b: "b2", c: 'c2'},
            ],
        },
        expected = { 
            obj1: [
                { aa: "a1" , bb: "b1", c: 'c1'},
                { aa: "a2" , bb: "b2", c: 'c2'},
            ],
            obj2: [
                { aa: "a1" , bb: "b1", c: 'c1'},
                { aa: "a2" , bb: "b2", c: 'c2'},
            ],
        },
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    })

    test('list of objects in objects should have keys changed', () => {
        data = [
            { 
                obj1: { a: "a1" , b: "b1", c: 'c1'},
                obj2: { a: "a2" , b: "b2", c: 'c2'},
            },
            { 
                obj1: { a: "a1" , b: "b1", c: 'c1'},
                obj2: { a: "a2" , b: "b2", c: 'c2'},
            },
        ],
        expected = [
            { 
                obj1: { aa: "a1" , bb: "b1", c: 'c1'},
                obj2: { aa: "a2" , bb: "b2", c: 'c2'},
            },
            { 
                obj1: { aa: "a1" , bb: "b1", c: 'c1'},
                obj2: { aa: "a2" , bb: "b2", c: 'c2'},
            },
        ],
        swapped = parseTree.parseTree(keys2swap, data);
        expect(swapped).toEqual(expected);
    });
})

describe('Testing keys to swap can be reversed', () => {
    test('Testing keys to swap can be reveresed', () => {
        swap = { a: '1' };
        reversed = {'1': 'a'};

        expect(reversed).toEqual(parseTree.reverseKeys(swap));
    });

    test('Testing multiple keys to swap can be reveresed', () => {
        swap = { a: '1' , b: '2'};
        reversed = {'1': 'a', '2': 'b'};

        expect(reversed).toEqual(parseTree.reverseKeys(swap));
    });
});