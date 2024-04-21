
/**
 * Retry a request
 * @param {Function} fn
 * @param {object} options
 * @param {number} options.maxRetries
 * @param {number} options.retryDelay
 * @returns
 */
async function retryRequest(fn, {maxRetries = 3, retryDelay = 1000, timeout = 2000, onError = null} = {}) {
  let error

  const timeoutPromise = (ms) => new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), ms)
  )

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await Promise.race([fn(), timeoutPromise(timeout)])
      return result
    } catch (err) {
      error = err
      // 如果 onError 返回 false，停止重试
      if (onError && onError(error, attempt) === false) break

      if (attempt < maxRetries) {
        await delay(retryDelay)
      }
    }
  }

  const errorInfo = {
    error,
    message: `Failed after ${maxRetries} retries`,
  }

  throw new Error(JSON.stringify(errorInfo))
}

export default retryRequest

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Test
const request = () => new Promise((resolve, reject) => {
  const delay = Math.random() * 5000 // 随机延迟时间
  setTimeout(() => {
    Math.random() > 0.5 ? resolve('Success') : reject(new Error('Error'))
  }, delay)
})

const handleError = (error, attempt) => {
  console.log(`Error on attempt ${attempt}: ${error.message}`)
  return attempt < 3 // 只在前3次尝试失败时继续重试
};

retryRequest(request, {
  onError: handleError
}).then(console.log).catch(console.error)
