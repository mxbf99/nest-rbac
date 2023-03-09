<script setup lang="ts">
import { formatTime } from '@/utils/format'

interface ITableColumn {
  prop: string
  label: string
  width?: string
  align?: string
  type?: string
}

interface IProps {
  data: any[]
  columns: ITableColumn[]
  selection?: boolean
  config?: any
}

const props = withDefaults(defineProps<IProps>(), {
  selection: false
})
</script>
<template>
  <div>
    <el-table :data="data" v-bind="config">
      <!-- 选择框 -->
      <template v-if="props.selection">
        <el-table-column type="selection" width="38"
      /></template>

      <!-- 列 -->
      <template v-for="item in columns" :key="item.prop">
        <!-- 自定义列 -->
        <template v-if="item.type == 'custom'">
          <el-table-column
            width="100"
            :align="item.align || 'center'"
            v-bind="item"
          >
            <template v-slot="{ row, $index }">
              <slot :name="item.prop" :row="row" :index="$index">
                {{ row[item.prop] }}</slot
              >
            </template>
          </el-table-column>
        </template>
        <template v-else-if="item.type == 'date'">
          <el-table-column
            width="180"
            :align="item.align || 'center'"
            v-bind="item"
          >
            <template v-slot="{ row }">
              {{ formatTime(row[item.prop]) }}
            </template>
          </el-table-column>
        </template>
        <!-- 默认列 -->
        <template v-else>
          <el-table-column :align="item.align || 'center'" v-bind="item" />
        </template>
      </template>
    </el-table>
  </div>
</template>
<style scoped>
.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.el-table {
  margin-bottom: 20px;
}
</style>
