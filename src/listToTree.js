/**
 * 将列表还原成树状图
 * @param {object[]} data 
 */
function listToTree(data, pid = null) {
  return data.reduce((acc, item) => {
    if (item.pid === pid) {
      const children = listToTree(data, item.id)
      if (children.length) {
        item.children = children
      }
      return [...acc, item]
    }
    return acc
  }, [])
}

function listToTree2(arr) {
  const map = {}
  const res = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    map[item.id] = item
    item.children = []
  }

  for(let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.pid === null) {
      res.push(item)
    } else {
      map[item.pid].children.push(item)
    }
  }

  return res
}

// Test
const list = [
  { pid: null, id: 1, data: "1" },
  { pid: 1, id: 2, data: "2-1" },
  { pid: 1, id: 3, data: "2-2" },
  { pid: 2, id: 4, data: "3-1" },
  { pid: 3, id: 5, data: "3-2" },
  { pid: 4, id: 6, data: "4-1" },
]

// Expect
const res = {
  pid: null,
  id: 1,
  data: "1",
  children: [
    {
      id: 2,
      pid: 1,
      data: '2-1',
      children: []
    }
  ]
}