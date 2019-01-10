//Trick to transform Promises into functors
Promise.prototype.map = Promise.prototype.then;

const expire = (ms,name='Promise') =>  new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(`${name} timed out in ${ms} ms.`)
    }, ms)
});

const isAPromise = promise => promise instanceof Promise;
const reflect = promise => promise.then(val => ({val, status: "resolved" }), err => ({err, status: "rejected" }));

const timeout = (promise, ms, name = 'Promise') => {
    if(!isAPromise(promise))
    {
        throw 'Timeout can only receive a single promise!';
    }
   return Promise.race([promise,expire(ms,name)]);
}

const firstIfArray = arr => Array.isArray(arr[0]) ? arr[0] : arr;

const first = (...promises) => Promise.race(firstIfArray(promises));
const all = (...promises) => Promise.all(firstIfArray(promises));
const any = (...promises) => Promise.all(firstIfArray(promises).map(reflect));

module.exports = {all, first, timeout, any};
