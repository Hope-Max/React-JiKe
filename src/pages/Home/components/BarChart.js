import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import "./index.scss"

const BarChart = ({ title, name, data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Make sure the DOM is available
    // Get the DOM for rendering a chart - 获取渲染图表的dom节点
    const chartDom = chartRef.current
    // Chart initialization to generate the chart instance - 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom)
    // Parameters for chart - 图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: name
      },
      yAxis: {
        type: 'value',
        name: "%"
      },
      series: [
        {
          data: data,
          type: 'bar'
        }
      ]
    }
    // Rendering - 渲染
    option && myChart.setOption(option)
  }, [])

  return <div className='chart' ref={chartRef} ></div>
}

export default BarChart