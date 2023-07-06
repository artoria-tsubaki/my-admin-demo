/**
 * 1、事件循环的机制了解吗？宏任务和微任务的执行顺序是怎样的？
 * 2、怎么理解闭包这个定义的，在平时工作中有用到闭包的使用吗，举个例子。
 * 3、vue组件间的哪些通信方式？
 * 4、一个父组件潜嵌套了子组件，他的生命周期函数顺序是怎么执行的？
 * 5、vue的权限管理应该怎么做？路由级和按钮级分别怎么处理？
 * 6、说一下你对虚拟DOM的理解
 * 7、了解diff算法吗？vue的diff算法是怎样的一个过程
 * 8、能说一下v-for中key的作用吗？
 * 9、做过vue项目哪些性能方面的优化？
 * 10、vue组件为什么只能有一个根元素？
 * 11、如何实现路由懒加载呢？
 * 12、客户端渲染和服务端渲染有什么区别呢？在之前的工作中有做过服务端渲染吗？
 * 13、Vue长列表的优化方式怎么做？
 * 14、Vue3相比Vue2有哪些优化？
 * 15、为什么在模板中绑定事件的时候要加.native?
 * 16、能说一下响应式原理的过程吗？
 * 17、数组的响应式怎么实现的？
 * 18、Vue是数据改变后页面也会重新改变嘛；this.a = 1; this.a = 2; 他是怎么实现异步更新优化整个渲染过程的？
 * 19、render函数封装有什么特别的，或者用到比较巧妙的东西吗？
 * 20、浏览器缓存的方式有哪些？
 * 21、正向代理和反向代理的区别？
 * 22、域名解析过程是怎样的？
 * 23、TCP协议三次握手、四次挥手的过程，为什么挥手要4次？
 */

{
  // 2. 闭包就是能访问另一个函数作用域变量的函数，在JavaScript中可以认为是定义在函数内部的函数
  // 使用场景 防抖
  function debounce(fn, wait, immediate) {
    let timer
    let _this = this
    return function (...args) {
      timer && clearInterval(timer)
      if (immediate) {
        const exec = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        exec && fn.apply(_this, args)
      } else {
        timer = setInterval(() => {
          fn.apply(_this, args)
          timer = null
        }, wait)
      }
    }
  }
}

{
  // 3.
  /**
   *  1. 父组件 -> 子组件 prop传值
   *  2. 子组件 -> 父组件 emit触发方法
   *  3. 兄弟组件 eventbus vuex
   *  4. 跨级传递 provide inject
   */
}

{
  // 4.
  // 父 beforeCreate 父 created 父 beforeMount 子 beforeCreate 子 created  子 beforeMount 子 mounted 父 mounted
  // 父 beforeDestroy 子 beforeDestroy 子 Destroied  父 Destroied
}

{
  // 5.
  /**
   * 路由级（动态）：
   *  1. 在路由守卫拦截 beforeEach 没有菜单列表就 调用接口获取动态路由，
   *  2. 存入 vuex/pinia
   *  3. 合并本地的固定路由，添加到vue-router的路由对象
   *
   * 路由级（静态）：
   *  1. 初始化路由时调用接口获取菜单的权限，将权限判断添加到路由的 meta 上
   *  2. beforeEach 时根据 meta 判断是否有权限跳转
   *
   * 按钮级(Hooks)：
   *  1. 获取所有按钮权限
   *  2. useRoute 方法可以直接获取到当前菜单名称
   *  3. 获取当前页面的所有按钮权限
   *  4. 通过 v-if 控制显示显隐
   *
   * 按钮级(指令)：
   *  1. 获取所有按钮权限
   *  2. useRoute 方法可以直接获取到当前菜单名称
   *  3. 获取当前页面的所有按钮权限
   *  4. 通过 el.remove() 控制显隐
   */
}

{
  // 6.
  // 1. 是什么:一种使用树形结构对象来表示真实的DOM的js对象
  // 2. 作用：更新页面时减少真实DOM的资源消耗，提高页面性能速度
  // 3. 优缺点:
  /**
   * 优点：
   *  1. 降低浏览器性能消耗，查找js对象属性变化比查找dom树变化小
   *  2. 使用diff算法，减少回流重绘
   *  3. 跨平台
   *
   * 缺点：
   *  1. 多进行了一次查找，首次加载多消耗性能
   */
}

{
  // 17.
  // 为何这些方法不会触发getter/setter？因为这些方法是Array的原型上的方法，并没有在Array本身上面。
  // Array在getter中收集依赖，在拦截器中触发依赖，在Observer中保存依赖
  /**
   * 将数组的原型存到对象arrayMethods中
   * 找到Array上能够改变数组自身的7个方法 push, pop, shift, unshift, splice, sort, reverse
   * 将这7个方法进行响应式处理
   * 处理完成后，用它们把arrayMethods中对应的方法覆盖掉
   * 将需要进行响应式处理的数组arr的__proto__指向arrayMethods，如果浏览器不支持访问__proto__，则直接将响应式处理后的7个方法添加到数组arr上
   * 如果要将一个数组完全实现响应式，需要遍历该数组，将数组中的数组使用该方法进行响应式处理，将对象使用walk方法进行响应式处理
   */
}

{
  // 18.
  /**
   * 1. 基础数据类型直接改变，复杂数据类型不一定改变
   */
}

/**
 * 在 newVue() 后， Vue 会调用 _init 函数进行初始化，也就是init 过程，在 这个过程Data通过Observer转换成了getter/setter的形式，
 * 来对数据追踪变化，当被设置的对象被读取的时候会执行 getter 函数，而在当被赋值的时候会执行 setter函数。

 * 当render function 执行的时候，因为会读取所需对象的值，所以会触发getter函数从而将Watcher添加到依赖中进行依赖收集。

 * 在修改对象的值的时候，会触发对应的 setter， setter通知之前依赖收集得到的 Dep 中的每一个 Watcher，告诉它们自己的值改变了，需要重新渲染视图。
 * 这时候这些 Watcher就会开始调用 update 来更新视图。
 */

// data -> Observer -> data getter/setter
// render -> data.getter -> Watcher -> Dep
// update -> data.setter -> Dep/Watcher -> watcher.update

/**
 * 数据劫持
 *
 * 1. object.defineProperty
 * 2. Proxy
 */

/**
 * 依赖收集
 * 1. 所谓的依赖，其实就是Watcher。至于如何收集依赖，总结起来就一句话，在getter中收集依赖，在setter中触发依赖。
 *    先收集依赖，即把用到该数据的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就行了。
 * 2. 具体来说，当外界通过Watcher读取数据时，便会触发getter从而将Watcher添加到依赖中，哪个Watcher触发了getter，就把哪个Watcher收集到Dep中。
 *    当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍。
 * 3. 最后我们对 defineReactive 函数进行改造，在自定义函数中添加依赖收集和派发更新相关的代码,实现了一个简易的数据响应式。
 */

{
  // 20.
  /**
   * 1. http请求 expires:有效期内直接返回缓存文件不发请求  etag和last-modified：返回304读取缓存发送请求
   * 2. web sql
   * 3. indexDB
   * 4. cookie
   * 5. sessionStorage
   * 6. localStorage
   * 7. application cache 离线访问
   * 8. cacheStorage
   */
}

{
  // 21.
  /**
   * 1. 正向代理 代理客户端 客户端的请求都有中介接收，中介转发给服务端 服务端不知道客户端是谁发送的  eg:翻墙访问外网
   * 2. 反向代理 代理服务端 客户端发送请求后，将请求转发给内部的某个服务器，客户端不知道服务端是谁发送的  eg: 负载均衡
   */
}

{
  // 22. 域名结果过程
  /**
   * 1. 本地电脑会检测浏览器缓存中是否有这个域名解析过的ip
   * 2. 本地电脑会监测操作系统中是否有这个域名对应的DNS解析结果
   * 3. 用到 网络配置中的“DNS服务器地址”，操作系统会把这个域名发给本地DNS服务器，这个DNS服务器一般会缓存域名解析结果
   * 4. 本地DNS服务器没有命中就传给 根DNS服务器进行解析
   * 5. 跟DNS服务器会返回给本地DNS服务器一个顶级DNS服务器地址，它是国际顶级域名服务器，如 .com .cn 等全球只有13台
   * 6. 本地DNS再向顶级DNS服务器发送解析请求
   * 7. 接收请求的顶级DNS服务器查找并返回此域名对应的Name Server域名服务器地址，这个Name Server域名服务器就是我要访问的网站域名提供商的服务器，该域名的解析任务由该运营商来完成。
   * 8. Name Server服务器会查询存储的域名和ip的映射关系表，再把查询出来的域名和ip，以及整个TTL值返回给本地DNS服务器
   * 9. 本地DNS服务器拿到域名和对应的ip，缓存对应关系
   * 10. 本地DNS服务器将解析结果返回给本地电脑，本地电脑把缓存结果存到操作系统以及浏览器中
   */
}

{
  // 3次握手 4次挥手
}
