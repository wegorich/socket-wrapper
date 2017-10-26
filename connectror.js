const reducers = [];

const use = () => {
    let args = Array.from(arguments);

    args.forEach(item => {
        if (Array.isArray(item)) {
            item.forEach(e => reducers.push(e));
        } else {
            reducers.push(item);
        }
    });
}

const unuse = (reducer) => {
    let index = reducers.indexOf(reducer);
    
    if (index) {
        reducers.splice(index, 1);
    }
}

const call = (type, data) => {
    reducers.forEach(reducer => {
        reducer(type, data);
    });
}

export default {
    call,
    use,
    unuse
}