import promiseAll from '@/promise/promiseAll'

describe('Promise.all test', () => {
  test('should resolve', () =>
    promiseAll([1, 2, 3]).then((value) => {
      expect(value).toEqual([1, 2, 3])
    }))

  test('should resolve with promise', () =>
    promiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then((value) => {
      expect(value).toEqual([1, 2, 3])
    }))

  test('should reject', () =>
    promiseAll([Promise.resolve(1), Promise.reject('error'), Promise.resolve(3)]).catch((reason) => {
      expect(reason).toBe('error')
    }))

  test('should resolve with empty array', () =>
    promiseAll([]).then((value) => {
      expect(value).toEqual([])
    }))

  test('should resolve with non-array', () =>
    promiseAll(1).then((value) => {
      expect(value).toEqual([1])
    }))

  test('should resolve with array-like', () =>
    promiseAll({ 0: 1, 1: 2, 2: 3, length: 3 }).then((value) => {
      expect(value).toEqual([1, 2, 3])
    }))

  test('should resolve with mixed array-like', () =>
    promiseAll([1, { 0: 2, 1: 3, length: 2 }, 4]).then((value) => {
      expect(value).toEqual([1, { 0: 2, 1: 3, length: 2 }, 4])
    }))

  test('should reject with multiple times next', () =>
    promiseAll([
      () => {},
      () => {},
      () => {},
    ]).catch((reason) => {
      expect(reason.message).toBe('next() called multiple times')
    }))
})

