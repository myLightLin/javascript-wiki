import cloneDeep from '@/cloneDeep'

describe('cloneDeep', () => {
  test('should clone deep objects', () => {
    const obj = { a: 1, b: { c: 2 } }
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
  })

  test('should clone deep arrays', () => {
    const arr = [1, [2]]
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
  })

  test('should clone deep objects with circular references', () => {
    const obj = { a: 1 }
    obj.b = obj
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b).toBe(clone)
  })

  test('should clone deep arrays with circular references', () => {
    const arr = [1]
    arr.push(arr)
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1]).toBe(clone)
  })

  test('should clone deep objects with circular references in arrays', () => {
    const obj = { a: 1 }
    obj.b = [obj]
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b[0]).not.toBe(obj.b[0])
    expect(clone.b[0]).toBe(clone)
  })

  test('should clone deep arrays with circular references in objects', () => {
    const arr = [1]
    arr.push({ a: arr })
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1].a).not.toBe(arr[1].a)
    expect(clone[1].a).toBe(clone)
  })

  test('should clone deep objects with multiple circular references', () => {
    const obj = { a: 1 }
    obj.b = obj
    obj.c = obj
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b).toBe(clone)
    expect(clone.c).not.toBe(obj.c)
    expect(clone.c).toBe(clone)
  })

  test('should clone deep arrays with multiple circular references', () => {
    const arr = [1]
    arr.push(arr)
    arr.push(arr)
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1]).toBe(clone)
    expect(clone[2]).not.toBe(arr[2])
    expect(clone[2]).toBe(clone)
  })

  test('should clone deep objects with multiple circular references in arrays', () => {
    const obj = { a: 1 }
    obj.b = [obj]
    obj.c = [obj]
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b[0]).not.toBe(obj.b[0])
    expect(clone.b[0]).toBe(clone)
    expect(clone.c).not.toBe(obj.c)
    expect(clone.c[0]).not.toBe(obj.c[0])
    expect(clone.c[0]).toBe(clone)
  })

  test('should clone deep arrays with multiple circular references in objects', () => {
    const arr = [1]
    arr.push({ a: arr })
    arr.push({ a: arr })
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1].a).not.toBe(arr[1].a)
    expect(clone[1].a).toBe(clone)
    expect(clone[2]).not.toBe(arr[2])
    expect(clone[2].a).not.toBe(arr[2].a)
    expect(clone[2].a).toBe(clone)
  })

  test('should clone deep objects with circular references in arrays and objects', () => {
    const obj = { a: 1 }
    obj.b = [obj]
    obj.c = { d: obj }
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b[0]).not.toBe(obj.b[0])
    expect(clone.b[0]).toBe(clone)
    expect(clone.c).not.toBe(obj.c)
    expect(clone.c.d).not.toBe(obj.c.d)
    expect(clone.c.d).toBe(clone)
  })

  test('should clone deep arrays with circular references in objects and arrays', () => {
    const arr = [1]
    arr.push({ a: arr })
    arr.push([arr])
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1].a).not.toBe(arr[1].a)
    expect(clone[1].a).toBe(clone)
    expect(clone[2]).not.toBe(arr[2])
    expect(clone[2][0]).not.toBe(arr[2][0])
    expect(clone[2][0]).toBe(clone)
  })

  test('should clone deep objects with multiple circular references in arrays and objects', () => {
    const obj = { a: 1 }
    obj.b = [obj]
    obj.c = { d: obj }
    obj.e = [obj]
    const clone = cloneDeep(obj)
    expect(clone).toEqual(obj)
    expect(clone).not.toBe(obj)
    expect(clone.b).not.toBe(obj.b)
    expect(clone.b[0]).not.toBe(obj.b[0])
    expect(clone.b[0]).toBe(clone)
    expect(clone.c).not.toBe(obj.c)
    expect(clone.c.d).not.toBe(obj.c.d)
    expect(clone.c.d).toBe(clone)
    expect(clone.e).not.toBe(obj.e)
    expect(clone.e[0]).not.toBe(obj.e[0])
    expect(clone.e[0]).toBe(clone)
  })

  test('should clone deep arrays with multiple circular references in objects and arrays', () => {
    const arr = [1]
    arr.push({ a: arr })
    arr.push([arr])
    arr.push({ a: arr })
    const clone = cloneDeep(arr)
    expect(clone).toEqual(arr)
    expect(clone).not.toBe(arr)
    expect(clone[1]).not.toBe(arr[1])
    expect(clone[1].a).not.toBe(arr[1].a)
    expect(clone[1].a).toBe(clone)
    expect(clone[2]).not.toBe(arr[2])
    expect(clone[2][0]).not.toBe(arr[2][0])
    expect(clone[2][0]).toBe(clone)
    expect(clone[3]).not.toBe(arr[3])
    expect(clone[3].a).not.toBe(arr[3].a)
    expect(clone[3].a).toBe(clone)
  })
})
