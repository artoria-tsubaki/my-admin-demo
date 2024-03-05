import { Table } from "./interface"
import { computed, onMounted, reactive, toRefs } from "vue"

export const useTable = (
  api: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallback?: (data: any) => any
) => {
  const state = reactive<Table.TableStateProps>({
    // 表格数据
    tableData: [],
    // 分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      // 总条数
      total: 0
    },
    // 查询参数
    searchParam: {},
    // 初始化默认的查询参数
    searchInitParam: {},
    // 总参数
    totalParam: {}
  })

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize
      }
    },
    set: (newVal: any) => {
      console.log("我是分页更新之后的值 ~~", newVal);
    }
  })

  // 初始化时 设置表单查询默认值 获取表格数据
  onMounted(() => {
    reset()
  })

  /**
   * @descrition 获取表格数据
   * @return void
   */
  const getTableList = async () => {
    try {
      // 先把初始化参数和分页参数放到总参数里面
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {})
      let { data } = await api(state.totalParam)
      dataCallback && (data = dataCallback(data))
      state.tableData = isPageable ? data.datalist ? data.datalist : data.list : data
      // 结构后台返回的分页数据
      const { pageNum, pageSize, total } = data
      isPageable && updatePageable({ pageNum, pageSize, total })
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description 更新查询参数
   * @return void
   */
  const updatedTotalParam = () => {
    state.totalParam = {}
    // 处理查询参数，可以给查询参数自定义前缀操作
    let nowSearchParam: { [key: string]: any } = {}
    // 防止手动清空输入框携带参数
    for (const key in state.searchParam) {
      // 某些情况下参数为 false / 0 也应该携带参数
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key]
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {})
  }

  /**
   * @description 更新分页信息
   * @param {Object} resPageable 后台返回的分页数据
   * @return void
   * */
  const updatePageable = (resPageable: Table.Pageable) => {
    Object.assign(state.pageable, resPageable);
  };

  /**
   * @description 表格数据查询
   * @return void
   */
  const search = () => {
    state.pageable.pageNum = 1
    updatedTotalParam()
    getTableList()
  }

  /**
   * @description 表格数据重置
   * @return void
   */
  const reset = () => {
    state.pageable.pageNum = 1
    state.searchParam = {}
    // 重置搜索表单时，如果有默认搜索参数，则重置默认的搜索参数
    Object.keys(state.searchInitParam).forEach(key => {
      state.searchParam[key] = state.searchInitParam[key]
    })
    updatedTotalParam()
    getTableList()
  }

  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1
    state.pageable.pageSize = val
    getTableList()
  }

  /**
   * @description 当前页改变
   * @param {Number} val 当前页
   * @return void
   */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val
    getTableList()
  }

  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange
  }
}

/**
 * 
 */