/**
 * 1. Cache-Control Expires
 * 2. ETag
 * 3. Last-Modified
 * 4. Application cache localStorage SessionStorage
 */


// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// 节流函数
function throttle(fn, delay) {
  let timer = null;
  let lastTime = null;
  return function() {
    const now = new Date().getTime();
    if (lastTime && now - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = now;
        fn.apply(this, arguments);
      }, delay);
    } else {
      lastTime = now;
      fn.apply(this, arguments);
    }
  };
}

// 带有是否立即执行参数的节流函数
function throttle(fn, delay, immediate) {
  let timer = null;
  let lastTime = null;
  return function() {
    const now = new Date().getTime();
    if (lastTime && now - lastTime < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = now;
        fn.apply(this, arguments);
      }, delay);
    } else {
      lastTime = now;
      if (immediate) {
        fn.apply(this, arguments);
      } else {
        timer = setTimeout(() => {
          fn.apply(this, arguments);
        }, delay);
      }
    }
  };
}



/**
 * 将扁平数组转化为树形结构
 * @param {Array} list 扁平数组
 * @param {String} idKey id字段名
 * @param {String} parentKey 父节点id字段名
 * @param {String} childrenKey 子节点字段名
 * @returns {Array} 树形结构数组
 */
function flatListToTree(list, idKey = 'id', parentKey = 'parentId', childrenKey = 'children') {
  const map = {};
  const roots = [];
  let node;
  let i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i][idKey]] = i;
    list[i][childrenKey] = [];
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node[parentKey] !== null) {
      list[map[node[parentKey]]][childrenKey].push(node);
    } else {
      roots.push(node);
    }
  }
  return roots;
}

/**
 * 将十六进制颜色转化为rgba格式颜色
 * @param {String} hex 十六进制颜色值
 * @param {Number} alpha 透明度值，默认为1
 * @returns {String} rgba格式颜色值
 */
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 将树形结构转化为扁平数组
 * @param {Array} tree 树形结构数组
 * @param {String} childrenKey 子节点字段名
 * @returns {Array} 扁平数组
 */
function treeToFlatList(tree, childrenKey = 'children') {
  const list = [];
  let node;
  let i;
  for (i = 0; i < tree.length; i += 1) {
    node = { ...tree[i] };
    delete node[childrenKey];
    list.push(node);
    if (tree[i][childrenKey].length > 0) {
      list.push(...treeToFlatList(tree[i][childrenKey], childrenKey));
    }
  }
  return list;
}


