
const expire = (ms,name='Promise') =>  new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      reject(`${name} timed out in ${ms} ms.`)
    }, ms)
});

const isAPromise = promise => promise instanceof Promise;
const reflect = promise => promise.then(v => ({v, status: "resolved" }), e => ({e, status: "rejected" }));

const timeout = (promise, ms, name = 'Promise') => {
    if(!isAPromise(promise))
    {
        throw 'Timeout can only receive a single promise!';
    }
   return Promise.race([promise,expire(ms,name)]);
}

const first = (...promises) => Promise.race(promises);
const all = (...promises) => Promise.all(promises);
const any = (...promises) => Promise.all(promises.map(reflect));

module.exports = {all, first, timeout, any};
