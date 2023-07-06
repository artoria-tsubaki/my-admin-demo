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
        }
      })
    })

    // 模板编译
    Compile(options.el, this)
  }
}
