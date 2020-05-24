function observe(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    Object.keys(obj).forEach(key => {
        defineProperty(obj, key, obj[key]);
    });
}

function defineProperty(obj, key, val) {
    if (typeof val === 'object') {
        observe(val);
    }
    Object.defineProperty(obj, key, {
        get() {
            console.log('get: ', key, val);
            return val;
        },
        set(newVal) {
            if (val !== newVal) {
                observe(newVal);
                val = newVal;
            }
            console.log('set: ', key, val);
            return val;
        }
    });
}

function set(obj, key, val) {
    defineProperty(obj, key, val);
}

let obj = {
    foo: 1,
    bar: {
        baz: 2
    }

}
observe(obj)

// obj.foo;
// obj.foo = 2;
// obj.bar.baz = 222;
// obj.bar = {
//     b: 3
// }
// obj.bar.b = 444;

set(obj, 'newAttr', 6);
obj.newAttr;
obj.newAttr = 7;