class Publisher {
  constructor() {
    this.subs = {}
  }

  add(key, cb) {
    if (!this.subs[key]) {
      this.subs[key] = []
    }
    this.subs[key].push(cb)
  }

  notify(key, value) {
    if (!this.subs[key]) {
      throw Error('no publish')
    }
    this.subs[key].forEach((cb) => cb(value))
  }

  off(key) {
    if (!this.subs[key]) {
      throw Error('no publish')
    }
    delete this.subs[key]
  }
}

const p = new Publisher()
p.add('c1', () => {
  console.log('添加订阅，我是c1 1')
})
p.add('c1', (value) => {
  console.log('添加订阅，我是c1 2，参数为: ' + value)
})

p.notify('c1', 3)
