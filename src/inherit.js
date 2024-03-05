/**
 * 寄生组合式继承
 * @param {*} name
 */
function Parent(name) {
  this.name = name
}

Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(name)
  this.age = age
}

function create(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function inheritPrototype(child, parent) {
  const prototype = create(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

inheritPrototype(Child, Parent)

Child.prototype.getAge = function() {
  console.log(this.age)
}

// Test
const child = new Child('小明', 18)
child.getName() // 小明
child.getAge()  // 18
