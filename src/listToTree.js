/**
 * 将列表还原成树状图
 * @param {object[]} data
 */
export function listToTreeRecursive(data, pid = null) {
  return data.reduce((acc, item) => {
    if (item.pid === pid) {
      const children = listToTreeRecursive(data, item.id)
      if (children.length) {
        item.children = children
      }
      return [...acc, item]
    }
    return acc
  }, [])
}

export function listToTreeIterative(arr) {
  const map = {}
  const res = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    map[item.id] = item
    item.children = []
  }

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.pid === null) {
      res.push(item)
    } else {
      map[item.pid].children.push(item)
    }
  }

  return res
}
