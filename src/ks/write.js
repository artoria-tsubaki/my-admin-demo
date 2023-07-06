{
  // 雑貨　イタリア　長靴　新疆　メロン　ラグビーボール　砂　雷鳥　実　立てる
  // 時期　受講料　金額　離婚　理由　夫婦　家庭料理　対応　天候　温度　調整する　水道　ガス　時刻　機能　食料品
  // スマート　鰻　全身　朝食　バレンタインデー　贈る　タイミング
  // ツアー　欧米　洋室　和服　和菓子　洋菓子　和式　洋式　和風　洋風　農村　ランニング　不燃ごみ　ジーンズ
  // 株価　芝居　了解　咳　流行る　おしゃれする　面倒くさい　ハンドバック　夫　生き残る　奇跡　祭り　倒れる
  // 先　とがる　漆　塗る　専用　茶碗　大皿　取りばし　正式　マナー　文化　実に　～割
  // 様々　フォーク　洋食　和食　れんげ　おわん　持ち上げる　口　具　材料　地域　竹　玉　金属　やや　平ら　ステンレス
  // 秋葉原　クイズ番組　撮影　支払い　リストラ　解雇する　賛成　アイディア　偶然　逆　従兄弟　従妹　医療　議論
}

{
  // シーエム　参考　制作　感性　創作　募集する　形式　審査員　スター　話題　なるほど　取り上げる　それぞれ
  // 参考にする　参考になる　話題になる　どういう　みっともない　イタリア料理　トマト　ニンニク　イベント
  // 延期　花瓶　サンドイッチ　交通網　発達する　医療ミス　診察　宝石　梅　転校する　女子　方法　トラブル
  // ミルク　販売促進　発表　集合 改札口　部署　ベテラン　研修センター　地理　錠
}

// {
//   // 1. 创建10个标签，点击的时候弹出来对应的序号
//   //

//   let fragment = document.createDocumentFragment()
//   let ul = document.createElement('ul')

//   for (let i = 0; i < 10; i++) {
//     const li = document.createElement('li')
//     li.style.display = 'block'
//     li.innerText = `我是标签${i}`
//     li.addEventListener('click', () => {
//       alert(`我的序号是：${i}`)
//     })
//     fragment.appendChild(li)
//   }

//   ul.appendChild(fragment)
//   document.body.append(ul)
// }

{
  // 单例模式
  function Singleton(fn) {
    let instance
    let handle = {
      constructor(target, args) {
        if (!instance) {
          instance = Reflect.constructor(fun, args)
        }
        return instance
      }
    }

    return new Proxy(fn, handle)
  }

  function singleton(fn) {
    let result
    return function (...args) {
      return result || (result = fn.apply(this, args))
    }
  }

  function add(a, b) {
    console.log(a, b)
    return a + b
  }

  let SingletonAddFunc = Singleton(add)

  const result1 = SingletonAddFunc(3, 4)
  const result2 = SingletonAddFunc(3, 4)
  const result3 = SingletonAddFunc(3, 4)

  console.log(result1, result2, result3)
}

{
  function _deepclone(obj, hash = new WeakMap()) {
    if (obj === null || obj === undefined) return obj
    if (obj instanceof Date || obj instanceof RegExp) return obj
    if (typeof obj !== 'object') return obj
    if (hash.get(obj)) return has.get(obj)
    let cloneObj = new obj.constructor()
    hash.set(obj, cloneObj)
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        cloneObj[key] = _deepclone(obj[key], hash)
      }
    }
    return cloneObj
  }

  let obj = _deepclone({
    a: 1,
    b: '2',
    c: new Date(),
    d: function getName() {},
    e: {
      f: 3,
      g: {
        i: 4
      }
    },
    h: [1, 2, 3, 4]
  })
  console.log(obj)
}

{
  function debounce(fn, wait) {
    let timer
    return function (...args) {
      let _this = this
      timer && clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(_this, args)
      }, wait)
    }
  }

  function _debounce(fn, wait, immediate) {
    let timer
    let _this = this
    return function (...args) {
      timer && clearTimeout(timer)
      if (immediate) {
        let run = !timer
        if (run) {
          fn.apply(_this, args)
        }
        timer = setTimeout(() => {
          timer = null
        }, wait)
      } else {
        timer = setTimeout(() => {
          fn.apply(_this, args)
          timer = null
        }, wait)
      }
    }
  }

  function throttle(fn, wait) {
    let timer
    return function (...args) {
      let _this = this
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(_this, args)
          timer = null
        }, wait)
      }
    }
  }
}
