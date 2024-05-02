import assert from 'node:assert/strict'
import cloneDeep from '../src/cloneDeep.js'

describe('cloneDeep', () => {
  it('should clone primitive values', () => {
    const a = 123
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone string values', () => {
    const a = '123'
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone boolean values', () => {
    const a = true
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone null values', () => {
    const a = null
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone undefined values', () => {
    const a = undefined
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone symbol values', () => {
    const a = Symbol()
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone plain objects', () => {
    const a = {
      foo: {
        bar: 'baz',
      },
    }
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone arrays', () => {
    const a = [1, 2, 3]
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone nested arrays', () => {
    const a = [
      [1, 2],
      [3, 4],
    ]
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone functions', () => {
    const a = function () {
      return 1 + 2
    }
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone regular expressions', () => {
    const a = /foo/gim
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone dates', () => {
    const a = new Date()
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone Maps', () => {
    const a = new Map()
    a.set('foo', { bar: 'baz' })
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })
})
