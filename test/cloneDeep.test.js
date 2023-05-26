import assert from 'node:assert/strict'
import cloneDeep from '../src/cloneDeep.js'

describe('cloneDeep', function() {
  it('should clone primitive values', function() {
    const a = 123
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone string values', function() {
    const a = '123'
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone boolean values', function() {
    const a = true
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone null values', function() {
    const a = null
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone undefined values', function() {
    const a = undefined
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone symbol values', function() {
    const a = Symbol()
    const b = cloneDeep(a)
    assert.strictEqual(a, b)
  })

  it('should clone plain objects', function() {
    const a = {
      foo: {
        bar: 'baz'
      }
    }
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone arrays', function() {
    const a = [1, 2, 3]
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone nested arrays', function() {
    const a = [[1, 2], [3, 4]]
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone functions', function() {
    const a = function() {
      return 1 + 2
    }
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone regular expressions', function() {
    const a = /foo/gim
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone dates', function() {
    const a = new Date()
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })

  it('should clone Maps', function() {
    const a = new Map()
    a.set('foo', { bar: 'baz' })
    const b = cloneDeep(a)
    assert.deepStrictEqual(a, b)
  })
})