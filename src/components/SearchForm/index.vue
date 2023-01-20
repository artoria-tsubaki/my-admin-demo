<script setup lang="ts" name="SearchForm">
import { ColumnProps } from '@/components/ProTable/interface'
import { BreakPoint } from '@/components/Grid/interface'
import SearchFormItem from './components/SearchFormItem.vue'
import Grid from '@/components/Grid/index.vue'
import GridItem from '@/components/Grid/components/GridItem.vue'
import { computed, ref } from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'

/**
 * type BreakPoint: "xs" | "sm" | "md" | "lg" | "xl";
 * Record<BreakPoint, number>
 * const cols = searchCol = {
 *  xs: 1,
 *  sm: 2,
 *  md: 3,
 *  lg: 4,
 *  xl: 5,
 * }
 */
interface ProTableProps {
  columns?: ColumnProps[]
  searchParam?: { [key: string]: any }
  searchCol: number | Record<BreakPoint, number> // Record 参考 https://www.jianshu.com/p/ff5ee22b2053
  search: (params: any) => void
  reset: (params: any) => void
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({})
})

// 获取响应式设置
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl
  }
}

// 是否默认折叠搜索项
const collapsed = ref(true)

// 获取响应式断点
const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

// 判断是否显示 展开/合并 按钮
const showCollapse = computed(() => {
  let show = false
  console.log(props.columns)
  console.log(props.searchCol)
  props.columns.reduce((prev, current) => {
    prev += (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) + (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true
    } else {
      if (prev > props.searchCol) show = true
    }
    return prev
  }, 0)
  console.log(showCollapse)
  return show
})
</script>

<template>
  <div class="card table-search" v-if="columns.length">
    <el-form ref="formRef" :model="searchParam" label-width="auto">
      <Grid ref="gridRef" :collapsed="collapsed" :gap="[20, 0]" :cols="searchCol">
        <GridItem v-for="(item, index) in columns" :key="item.prop" v-bind="getResponsive(item)" :index="index">
          <el-form-item :label="`${item.label} :`">
            <SearchFormItem :column="item" :searchParam="searchParam" />
          </el-form-item>
        </GridItem>
        <GridItem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
            <el-button :icon="Delete" @click="reset">重置</el-button>
            <el-button v-if="showCollapse" type="primary" link class="search-isOpen" @click="collapsed = !collapsed">
              {{ collapsed ? '展开' : '合并' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </GridItem>
      </Grid>
    </el-form>
  </div>
</template>

<style scoped></style>
