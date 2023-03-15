/**
 * 实现异步请求并发控制
 */
function concurrencyRequest(urls, maxLimit) {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }

    const result = []
    let index = 0
    let count = 0

    async function run() {
      if (index === urls.length) return
      const i = index
      const url = urls[index]
      index++
      console.log(url)

      try {
        const resp = await fetch(url)
        result[i] = resp
      } catch (err) {
        result[i] = err
      } finally {
        count++
        if (count === urls.length) {
          resolve(result)
        }
        run()
      }
    }
    const times = Math.min(maxLimit, urls.length)
    for (let i = 0; i < times; i++) {
      run()
    }
  })
}

const sendRequest = (tasks, max) => {
  let index = 0
  let result = []

  const together = new Array(max).map(() => {
    return new Promise((resolve) => {
      const run = () => {
        if (index >= tasks.length) {
          resolve()
          return
        }
        let cur = index
        let task = tasks[index]
        index++
        task().then((res) => {
          result[cur] = res
        }).catch(err => {
          result[cur] = err 
        })
        .finally(() => {
          run()
        })
      }

      run()
    })
  })

  return Promise.all(together)
}