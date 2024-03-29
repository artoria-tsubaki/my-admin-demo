import { isArray } from "./is";

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  let defaultBrowserLang = "";
  if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
    defaultBrowserLang = "zh"
  } else {
    defaultBrowserLang = "en"
  }
  return defaultBrowserLang
}

/**
 * @description 扁平化菜单数组
 * @param {Array} menuList 所有菜单列表
 * @returns 
 */
export function getFlatArr(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.reduce((pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
    let flatArr = [...pre, current]
    if(current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
    return flatArr
  }, [])
}

export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max)
  return num
}

/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  let timeNow = new Date()
  // 获取当前小时
  let hours = timeNow.getHours()
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
	if (hours >= 10 && hours <= 14) return `中午好 🌞`;
	if (hours >= 14 && hours <= 18) return `下午好 🌞`;
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 使用递归，过滤需要缓存的路由
 * @param {Array} menuList 所有菜单列表
 * @param {Array} cacheArr 缓存的路由菜单 name ['**','**']
 * @return array
 * */
 export function getKeepAliveRouterName(menuList: Menu.MenuOptions[], keepAliveArr: string[] = []) {
	menuList.forEach(item => {
		item.meta.isKeepAlive && item.name && keepAliveArr.push(item.name);
		item.children?.length && getKeepAliveRouterName(item.children, keepAliveArr);
	});
	return keepAliveArr;
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param menuList 所有菜单列表
 * @returns 
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
  let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 使用递归，过滤出当前路径匹配的面包屑地址
 * @param {String} path 当前访问地址
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
 export function getCurrentBreadcrumb(path: string, menuList: Menu.MenuOptions[]) {
	let tempPath: Menu.MenuOptions[] = [];
	try {
		const getNodePath = (node: Menu.MenuOptions) => {
			tempPath.push(node);
			if (node.path === path) throw new Error("Find IT!");
			if (node.children?.length) node.children.forEach(item => getNodePath(item));
			tempPath.pop();
		};
		menuList.forEach(item => getNodePath(item));
	} catch (e) {
		return tempPath;
	}
}

/**
 * @description 双重递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @returns array
 */
 export function getAllBreadcrumbList(menuList: Menu.MenuOptions[]) {
   let handleBreadcrumbList: { [key: string]: any } = {};
   console.log(menuList)
	const loop = (menuItem: Menu.MenuOptions) => {
		if (menuItem?.children?.length) menuItem.children.forEach(item => loop(item));
		else handleBreadcrumbList[menuItem.path] = getCurrentBreadcrumb(menuItem.path, menuList);
	};
   menuList.forEach(item => loop(item));
   console.log(handleBreadcrumbList)
	return handleBreadcrumbList;
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if(propArr.length == 1) return prop
  return propArr[propArr.length - 1]
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
 export function formatValue(callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
	if (!prop.includes(".")) return row[prop];
	prop.split(".").forEach(item => {
		row = row[item] ?? "--";
	});
	return row;
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
 export function filterEnum(
	callValue: any,
	enumData: { [key: string]: any } | undefined,
	searchProps?: { [key: string]: any },
	type?: string
): string {
	const value = searchProps?.value ?? "value";
	const label = searchProps?.label ?? "label";
	let filterData: any = {};
	if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData[label] : "--";
}

/**
 * @description 生成唯一 uuid
 * @return string
 */
 export function generateUUID() {
	if (typeof crypto === "object") {
		if (typeof crypto.randomUUID === "function") {
			return crypto.randomUUID();
		}
		if (typeof crypto.getRandomValues === "function" && typeof Uint8Array === "function") {
			const callback = (c: any) => {
				const num = Number(c);
				return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
			};
			return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, callback);
		}
	}
	let timestamp = new Date().getTime();
	let performanceNow = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		let random = Math.random() * 16;
		if (timestamp > 0) {
			random = (timestamp + random) % 16 | 0;
			timestamp = Math.floor(timestamp / 16);
		} else {
			random = (performanceNow + random) % 16 | 0;
			performanceNow = Math.floor(performanceNow / 16);
		}
		return (c === "x" ? random : (random & 0x3) | 0x8).toString(16);
	});
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
 export function isType(val: any) {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}