import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import "./index.scss"

const Home = () => {

  const chartRef = useRef(null)

  useEffect(() => {
    // Make sure the DOM is available
    // Get the DOM for rendering a chart - 获取渲染图表的dom节点
    const chartDom = chartRef.current
    // Chart initialization to generate the chart instance - 图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom)
    // Parameters for chart - 图表参数
    const option = {
      xAxis: {
        type: 'category',
        data: ['Node.js', 'React', 'jQuery', 'Express', 'Angular', 'Next.js', 'ASP.NET CORE', 'Vue.js']
      },
      yAxis: {
        type: 'value',
        name: "%"
      },
      series: [
        {
          data: [42.65, 40.58, 21.98, 19.28, 17.46, 16.67, 16.57, 16.38],
          type: 'bar'
        }
      ]
    }
    // Rendering - 渲染
    option && myChart.setOption(option)
  }, [])

  return <div>
    <div>Most used web frameworks among developers worldwide, as of 2023</div>
    <div className='chart' ref={chartRef} ></div>
  </div>
}

export default Home