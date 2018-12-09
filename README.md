# Cofu

NPM module to simplify promises concurrency patterns


Usage:

```
$   npm i --save cofu

const {all, first, timeout, any} = require('cofu');

```

## Timeout

Returns a timeout promise if we reach the timeout before the current promise resolved.
```
// Resolves before 300 ms of timeout

timeout(Promise200ms,300).then(console.log).catch(err => console.log("error:",err))
> 1

// Resolves after 300 ms of  timeout

timeout(Promise500ms,300).then(console.log).catch(e => console.log('Error:',e));
> Error: Promise timed out in 300 ms.
```

You can also pass a context to know which promise timed out.

```
timeout(Promise500ms,300,'Fetching images').then(console.log).catch(e => console.log('Error:',e));
> Error: Fetching images timed out in 300 ms.

```

## All

Returns a promise that is resolved when all promises finish as resolved or rejects when a single one fails.
```
// No failure

all(Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)).then(console.log).catch(err => console.log("error:",err))
> [1,2,3]

// One failure

all(Promise.resolve(1),Promise.reject(2),Promise.resolve(3)).then(console.log).catch(err => console.log("error:",err))
> error: 2
```
## Any

Returns a promise that is resolved when all promises finish independenly if they failed or not.
```
// One failure

any(Promise.resolve(1),Promise.reject(2)).then(console.log);

> [ { val: 1, status: 'resolved' }, { err: 2, status: 'rejected' } ]
```
## First

Returns the first promise that resolves.
```
// fastPromise returns 1 , slowPromise returns 2

first(fastPromise,slowPromise).then(console.log);

> 1

first(slowPromise,fastPromise).then(console.log);

> 1
```
