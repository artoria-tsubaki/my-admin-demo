<script setup lang="ts" name="colSetting">
import { ColumnProps } from '@/components/ProTable/interface'
import { ref } from 'vue'

defineProps<{ colSetting: ColumnProps[] }>()

const drawerVisible = ref<boolean>(false)

const openColSetting = () => {
  drawerVisible.value = true
}

defineExpose({
  openColSetting,
})
</script>

<template>
  <!-- 列设置 -->
  <el-drawer title="列设置" v-model="drawerVisible" size="500px">
    <div class="table" ref="colTableRef">
      <el-table :data="colSetting" :border="true" row-key="prop" default-expand-all :tree-props="{ children: '_children' }">
        <el-table-column prop="label" align="center" label="列名"></el-table-column>
        <el-table-column prop="isShow" align="center" label="显示" v-slot="scope">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </el-table-column>
        <el-table-column prop="sortable" align="center" label="排序" v-slot="scope">
          <el-switch v-model="scope.row.sortable"></el-switch>
        </el-table-column>
        <tamplate #empty>
          <div class="table-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无可配置列</div>
          </div>
        </tamplate>
      </el-table>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
.cursor-move {
  cursor: move;
}
</style>
