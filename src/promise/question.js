/* eslint-disable no-console */
// Promise 执行顺序考察
function promise1() {
  return new Promise((resolve) => {
    console.log('promise1 start')
    resolve()
  })
}
function promise2() {
  return new Promise((resolve) => {
    console.log('promise2 start')
    resolve()
  })
}
function promise3() {
  return new Promise((resolve) => {
    console.log('promise3 start')
    resolve()
  })
}
function promise4() {
  return new Promise((resolve) => {
    console.log('promise4 start')
    resolve()
  }).then(() => {
    console.log('promise4 end')
  })
}
async function asyncFun() {
  console.log('async1 start')
  await promise2()
  console.log('async1 inner')
  await promise3()
  console.log('async1 end')
}
setTimeout(() => {
  console.log('setTimeout start')
  promise1()
  console.log('setTimeout end')
}, 0)
asyncFun()
promise4()
console.log('script end')
