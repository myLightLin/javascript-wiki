// npx promises-aplus-tests ./test/promise/promise.test.js
const Promise = require('../../src/promise/promise')

Promise.deferred = function() {
  const obj = {}

  obj.promise = new Promise(function(resolve, reject) {
    obj.resolve = resolve
    obj.reject = reject
  })

  return obj
}

module.exports = Promise