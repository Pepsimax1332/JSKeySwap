KeySwapper = require('../modules/swapKeys');

describe('Testing KeySwapper to swap keys', () => {

    const key2swap = {
        A: 'aa'
    };

    const keys2swap = {
        A: 'aa',
        B: 'bb',
    };

    test('primative value that is different from key to be swapped should not change', () => {
        data = 'b';

        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(data);
    });

    test('primative value that is same as key to be swapped should not change', () => {
        data = 'a';

        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(data);
    });

    test('empty array should return empty array', () => {
        data = [];
        expected = [];
        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('array containing primative containing key to be swapped should not change', () => {
        data = ['a'];

        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(data);
    });

    test('array containing multiple primatives with key values to be swapped should not change', () => {
        data = ['a', 'a', 'b'];

        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(data);
    });

    test('Object with key to be swapped should be changed', () => {
        data = { A: "a" };
        expected = { aa: "a" };

        keySwapper = new KeySwapper(data, key2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('Object with multiple matching keys to be swapped should be changed', () => {
        data = { A: "a" , B: "b" };
        expected = { aa: "a" , bb: "b" };

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('Only matching keys to be swapped should be changed', () => {
        data = { A: "a" , B: "b", C:'c' };
        expected = { aa: "a" , bb: "b", c:'c' };

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('nested objects in lists should have keys changed', () => {
        data = [
            { A: "a1" , B: "b1", C: 'c1'},
            { A: "a2" , B: "b2", C: 'c2'},
        ];
        expected = [
            { aa: "a1" , bb: "b1", c: 'c1'},
            { aa: "a2" , bb: "b2", c: 'c2'},
        ];

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('nested objects in objects should have keys changed', () => {
        data = {
            A: { A: "a1" , B: "b1", C: 'c1'},
            B: { A: "a2" , B: "b2", C: 'c2'},
        };
        expected = {
            aa: { aa: "a1" , bb: "b1", c: 'c1'},
            bb: { aa: "a2" , bb: "b2", c: 'c2'},
        };

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('nested objects containing objetcs in arrays should have keys changed', () => {
        data = { 
            A: [
                { A: "a1" , B: "b1", C: 'c1'},
                { A: "a2" , B: "b2", C: 'c2'},
            ],
            B: [
                { A: "a1" , B: "b1", C: 'c1'},
                { A: "a2" , B: "b2", C: 'c2'},
            ],
        },
        expected = { 
            aa: [
                { aa: "a1" , bb: "b1", c: 'c1'},
                { aa: "a2" , bb: "b2", c: 'c2'},
            ],
            bb: [
                { aa: "a1" , bb: "b1", c: 'c1'},
                { aa: "a2" , bb: "b2", c: 'c2'},
            ],
        },

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('list of objects in objects should have keys changed', () => {
        data = [
            { 
                A: { A: "a1" , B: "b1", C: 'c1'},
                B: { A: "a2" , B: "b2", C: 'c2'},
            },
            { 
                A: { A: "a1" , B: "b1", C: 'c1'},
                B: { A: "a2" , B: "b2", C: 'c2'},
            },
        ],
        expected = [
            { 
                aa: { aa: "a1" , bb: "b1", c: 'c1'},
                bb: { aa: "a2" , bb: "b2", c: 'c2'},
            },
            { 
                aa: { aa: "a1" , bb: "b1", c: 'c1'},
                bb: { aa: "a2" , bb: "b2", c: 'c2'},
            },
        ],

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('all keys should be made lowercase', () => {
        data = [
            { 
                A: { A: "a1" , B: "b1", C: 'c1'},
                B: { A: "a2" , B: "b2", C: 'c2'},
            },
            { 
                A: { A: "a1" , B: "b1", C: 'c1'},
                B: { A: "a2" , B: "b2", C: 'c2'},
            },
        ],
        expected = [
            { 
                aa: { aa: "a1" , bb: "b1", c: 'c1'},
                bb: { aa: "a2" , bb: "b2", c: 'c2'},
            },
            { 
                aa: { aa: "a1" , bb: "b1", c: 'c1'},
                bb: { aa: "a2" , bb: "b2", c: 'c2'},
            },
        ],

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });
});

describe('Testing keys are non-capitalised and preserve camalCase', () => {
    const keys2swap = {
        'PeachPie': 'poachedPear'
    };

    test('keys that are not in keys2swap are non capitalised', () => {
        data = {
            'ApplePie': 1,
            'PizzaPie': 2,
        };
        expected = {
            'applePie': 1,
            'pizzaPie': 2,
        };

        keySwapper = new KeySwapper(data, {});
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });

    test('nested camalCase keys that are not in keys2swap are non capitalised', () => {
        data = {
            'ApplePie': {
                'PeachPie': 1,
            },
            'PizzaPie': 2,
        };
        expected = {
            'applePie': {
                'poachedPear': 1
            },
            'pizzaPie': 2,
        };

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap();

        expect(swapped).toEqual(expected);
    });
});

describe('Testing process is reversable', () => {
    const keys2swap = {
        'PeachPie': 'poachedPear'
    };

    test('nested camalCase keys that are not in keys2swap are capitalised', () => {
        data = {
            'applePie': {
                'poachedPear': 1
            },
            'pizzaPie': 2,
        };
        
        expected = {
            'ApplePie': {
                'PeachPie': 1,
            },
            'PizzaPie': 2,
        };

        keySwapper = new KeySwapper(data, keys2swap);
        swapped = keySwapper.swap(true);

        expect(swapped).toEqual(expected);
    });

    test('keys that a reverse swapped not in keys2swap are capatalised', () => {
        data = {
            'applePie': 1,
            'pizzaPie': 2,
        };
        
        expected = {
            'ApplePie': 1,
            'PizzaPie': 2,
        };

        keySwapper = new KeySwapper(data, {});
        swapped = keySwapper.swap(true);

        expect(swapped).toEqual(expected);
    });
});
