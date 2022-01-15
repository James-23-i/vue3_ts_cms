// 在组件内直接创建 echart 实例，会导致很多耦合的代码（也不利用扩展维护）

import * as echarts from 'echarts'

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOption = (option: echarts.EChartsOption) => {
    echartInstance.setOption(option)
  }
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOption,
  }
}

