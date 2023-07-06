class Vue {
  constructor(options) {
    this.$data = options.data

    // 数据劫持
    Observe(this.$data)

    // 属性代理
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get: function () {
          return this.$data[key]
        },
        set: function (newVal) {
          this.$data[key] = newVal
        }
      })
    })

    // 模板编译
    Compile(options.el, this)
  }
}

function Observe(obj) {
  if (!obj || typeof obj !== 'object') return

  const dep = new Dep()

  Object.keys(obj).forEach((key) => {
    let value = obj[key]

    Observe(value)

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set: function (newVal) {
        value = newVal
        Observe(value)
        dep.notify()
      }
    })
  })
}

function Compile(el, vm) {
  vm.$el = document.querySelector(el)

  const fragment = document.createDocumentFragment()

  let childNode

  while ((childNode = vm.$el.firstChild)) {
    fragment.appendChild(childNode)
  }

  replace(fragment)

  vm.$el.appendChild(fragment)

  function replace(node) {
    const reg = /\{\{\s*(\S+)\s*\}\}/

    if (node.nodeType === 3) {
      const text = node.textContent
      const execResult = reg.exec(text)
      if (execResult) {
        const value = execResult[1].split('.').reduce((newObj, k) => newObj[k], vm)
        node.textContent = text.replace(reg, value)

        new Watcher(vm, execResult[1], (newVal) => {
          node.textContent = text.replace(reg, newVal)
        })
      }
      return
    }

    if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT') {
      const attrs = Array.from(node.attributes)
      const findResult = attrs.find((x) => x.name === 'v-model')
      if (findResult) {
        const expStr = findResult.value
        const value = expStr.split('.').reduce((newObj, k) => newObj[k], vm)
        node.value = value

        new Watcher(vm, expStr, (newVal) => {
          node.value = newVal
        })

        node.addEventListener('input', (e) => {
          const keyArr = expStr.split('.')
          const obj = keyArr.slice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], vm)
          const leafKey = keyArr[keyArr.length - 1]
          obj[leafKey] = e.target.value
        })
      }
    }

    node.childNodes.forEach((child) => replace(child))
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach((sub) => sub.update())
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.update()
    Dep.target = null
  }
  update() {
    const value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
    this.cb(value)
  }
}

