import * as echarts from "echarts";
import { onActivated, onBeforeUnmount, onDeactivated } from "vue";

export const useEcharts = (myChart: echarts.ECharts, options: echarts.EChartsCoreOption) => {
  if (options && typeof options === "object") {
    myChart.setOption(options)
  }
  const echartsResize = () => {
    myChart && myChart.resize()
  }

  window.addEventListener("resize", echartsResize)

  onActivated(() => {
    window.addEventListener("resize", echartsResize)
  })

  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize)
  })
}