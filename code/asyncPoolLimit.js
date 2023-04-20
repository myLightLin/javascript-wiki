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

class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.queue = []
    this.count = 0
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve
      promiseCreator.reject = reject

      this.queue.push(promiseCreator)
      this.run()
    })
  }

  run() {
    if (this.count < this.limit && this.queue.length) {
      this.count += 1
      const promise = this.queue.shift()
      promise()
        .then(res => {
          promise.resolve(res)
        })
        .catch(err => {
          promise.reject(err)
        })
        .finally(() => {
          this.count -= 1
          this.run()
        })
    }
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// 打印顺序是：2 3 1 4

class Scheduler2 {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent
    this.currentConcurrent = 0
    this.taskQueue = []
  }

  addTask(promiseFactory) {
    return new Promise((resolve, reject) => {
      const taskWrapper = async () => {
        try {
          const result = await promiseFactory()
          resolve(result)
        } catch (err) {
          reject(err)
        } finally {
          this.currentConcurrent--
          this.runTask()
        }
      }

      if (this.currentConcurrent < this.maxConcurrent) {
        this.currentConcurrent++
        taskWrapper()
      } else {
        this.taskQueue.push(taskWrapper)
      }
    })
  }

  runTask() {
    if (this.currentConcurrent >= this.maxConcurrent || this.taskQueue.length === 0) {
      return
    }

    const nextTask = this.taskQueue.shift()
    this.currentConcurrent++
    nextTask()
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function task(id, duration) {
  console.log(`Task ${id} start`)
  await sleep(duration)
  console.log(`Task ${id} complete`)
}

(async () => {
  const scheduler = new Scheduler3(2)

  scheduler.addTask(() => task(1, 1000))
  scheduler.addTask(() => task(2, 1000))
  scheduler.addTask(() => task(3, 1000))
  scheduler.addTask(() => task(4, 1000))
  scheduler.addTask(() => task(5, 1000))

  await sleep(6000)
})()