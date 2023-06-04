const queue = new Set()
let isFlushing = false
const p = Promise.resolve()

export function queueJob(job) {
  queue.add(job)
  
  if (!isFlushing) {
    isFlushing = true
    p.then(() => {
      try {
        queue.forEach(job => job())
      } finally {
        isFlushing = false
        queue.clear = 0
      }
    })
  }
}