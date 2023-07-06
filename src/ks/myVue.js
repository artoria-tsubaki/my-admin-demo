class Vue {
  constructor(options) {
    this.$data = options.data

    // 数据劫持
    Observe(this.$data)

    // 数据属性转换
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

  vm.$el.append(fragment)

  function replace(node) {
    // 文本节点
    if (node.nodeType === 3) {
      const reg = /\{\{\s*(\S+)\s*\}\}/
      const textValue = node.textContent
      const regResult = reg.exec(textValue)
      if (regResult) {
        let value = regResult[1].split('.').reduce((newObj, k) => newObj[k], vm)
        node.textContent = value

        new Watcher(vm, regResult[1], (value) => {
          node.textContent = value
        })
      }
    }

    if (node.nodeType === 1 && node.tagName.toUpperCase() === 'INPUT') {
      console.log(node)
      let attrName = node.getAttribute('v-model')
      if (attrName) {
        let value = attrName.split('.').reduce((newObj, k) => newObj[k], vm)
        console.log(value)
        node.value = value

        new Watcher(vm, attrName, (value) => {
          node.value = value
        })

        node.addEventListener('input', (e) => {
          // const keyArr = attrName.split('.')
          // const obj = keyArr.splice(0, keyArr.length - 1).reduce((newObj, k) => newObj[k], vm)
          // const leafKey = keyArr[keyArr.length - 1]
          obj[leafKey] = e.target.value
        })
      }
    }

    node.childNodes.forEach((node) => replace(node))
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
    let value = this.key.split('.').reduce((newObj, k) => newObj[k], this.vm)
    this.cb(value)
  }
}
