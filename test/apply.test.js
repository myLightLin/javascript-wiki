const assert = require('assert')
require('../src/apply')

describe('Function.prototype.myApply', function() {
  it('find the max number in an array', function() {
    const nums = [5, 6, 2, 3, 7]
    const expectedResult = 7

    const result = Math.max.myApply(null, nums)
    assert.equal(result, expectedResult)
  })

  it('should return correct result when calling a function with arguments', function() {
    function sum(a, b) {
      return a + b
    }
    const expectedResult = 5

    const result = sum.myApply(null, [2, 3])
    assert.equal(result, expectedResult)
  })

  it('should work with a custom context', function() {
    const context = {
      x: 1,
      y: 2
    };

    function addToContext(a, b) {
      return this.x + this.y + a + b;
    }

    const expectedResult = 10;
    const result = addToContext.myApply(context, [3, 4]);
    assert.equal(result, expectedResult);
  });

  it('should throw an error if the second argument is not an array or array-like', function() {
    function sum(a, b) {
      return a + b;
    }
    assert.throws(() => {
      sum.myApply(null, 123);
    }, /the second  params must be array or array-like/);
  });

  it('should work with an array-like object as the second argument', function() {
    function sum(a, b) {
      return a + b;
    }
    const arrayLike = {
      0: 2,
      1: 3,
      length: 2
    };
    const expectedResult = 5;

    const result = sum.myApply(null, arrayLike);
    assert.equal(result, expectedResult);
  });

  it('should use global object as context when no context is provided', function() {
    function getContext() {
      return this;
    }
    const expectedResult = typeof window !== 'undefined' ? window : global;
    const result = getContext.myApply();
    assert.equal(result, expectedResult);
  });

  it('should use global object as context when context is null', function() {
    function getContext() {
      return this;
    }
    const expectedResult = typeof window !== 'undefined' ? window : global;
    const result = getContext.myApply(null);
    assert.equal(result, expectedResult);
  });
  
  it('should use global object as context when context is undefined', function() {
    function getContext() {
      return this;
    }
    const expectedResult = typeof window !== 'undefined' ? window : global;
    const result = getContext.myApply(undefined);
    assert.equal(result, expectedResult);
  });

  it('should throw a TypeError if myApply is called on a non-function object', function() {
    const nonFunction = {};
    assert.throws(() => {
      nonFunction.myApply();
    });
  });
})

