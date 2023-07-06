<script setup lang="ts" name="proTable">
import { onMounted, ref } from 'vue'

let model = ref<any>({})

const options = ref({
  // 表单整体配置项
  form: {
    inline: false,
    labelPosition: 'right',
    labelWidth: '80px',
    size: 'default',
    disabled: false,
    labelSuffix: ' :'
  },
  // 表单列配置项 (formItem 代表 item 配置项， attrs 代表 输入、选择框 配置项)
  columns: [
    {
      formItem: {
        label: '用户名',
        prop: 'username',
        labelWidth: '80px',
        required: true
      },
      attrs: {
        typeName: 'input',
        clearable: true,
        placeholder: '请输入用户名',
        disabled: true
      }
    },
    {
      formItem: {
        label: '密码',
        prop: 'password',
        class: 'data'
      },
      attrs: {
        typeName: 'input',
        clearable: true,
        autofocus: true,
        placeholder: '请输入密码',
        type: 'password'
      }
    },
    {
      formItem: {
        label: '邮箱',
        prop: 'email'
      },
      attrs: {
        typeName: 'input',
        placeholder: '请输入邮箱',
        clearable: true,
        style: 'width:500px',
        defaultValue: '1248353039@qq.com'
      }
    },
    {
      formItem: {
        label: '性别',
        prop: 'gender'
      },
      attrs: {
        typeName: 'select',
        placeholder: '请输入性别',
        style: 'width:500px',
        defaultValue: '0'
      },
      options: [
        {
          label: '男',
          value: '0'
        },
        {
          label: '女',
          value: '1'
        }
      ]
    },
    {
      formItem: {
        label: '开始时间',
        prop: 'startTime'
      },
      attrs: {
        typeName: 'date-picker',
        type: 'datetimerange',
        clearable: true,
        style: 'width:1000px',
        defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
      }
    }
  ]
})

onMounted(() => {
  options.value.columns.forEach((column) => {
    column.attrs.defaultValue && (model.value[column.formItem.prop] = column.attrs.defaultValue)
  })
})
</script>

<template>
  <div class="card content-box">
    <el-alert title="通过 component :is 组件属性 && v-bind 属性透传，可以将 template 中的 html 代码全部转变为 columns 配置项，具体配置请看代码" type="warning" :closable="false" />
    <component :is="'el-form'" v-bind="options.form" ref="proFormRef" :model="model">
      <template v-for="item in options.columns" :key="item.prop">
        <component :is="'el-form-item'" v-bind="item.formItem">
          <component :is="`el-${item.attrs.typeName}`" v-bind="item.attrs" v-model="model[item.formItem.prop]">
            <template v-if="item.attrs.typeName === 'select'">
              <component :is="`el-option`" v-for="(col, index) in item.options" :key="index" :label="col.label" :value="col.value"></component>
            </template>
          </component>
        </component>
      </template>
      <el-form-item>
        <slot name="operation"></slot>
      </el-form-item>
    </component>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
