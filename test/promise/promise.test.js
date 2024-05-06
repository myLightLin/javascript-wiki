import Promise from '@/promise/promise'

describe('Promise constructor test', () => {
  test('should resolve', () =>
    new Promise((resolve) => {
      resolve(1)
    }).then((value) => {
      expect(value).toBe(1)
    }))

  test('should reject', () =>
    new Promise((_, reject) => {
      reject('error')
    }).catch((reason) => {
      expect(reason).toBe('error')
    }))

  test('should chain', () =>
    new Promise((resolve) => {
      resolve(1)
    })
      .then((value) => value + 1)
      .then((value) => {
        expect(value).toBe(2)
      }))

  test('should catch', () =>
    new Promise((_, reject) => {
      reject('error')
    }).catch((reason) => {
      expect(reason).toBe('error')
    }))

  test('should chain catch', () =>
    new Promise((_, reject) => {
      reject('error')
    })
      .catch((reason) => reason)
      .then((value) => {
        expect(value).toBe('error')
      }))

  test('should chain catch and then', () =>
    new Promise((_, reject) => {
      reject('error')
    })
      .catch((reason) => reason)
      .then((value) => value)
      .then((value) => {
        expect(value).toBe('error')
      }))
})
