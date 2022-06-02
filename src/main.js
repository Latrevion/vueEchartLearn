import * as echarts from "echarts"


const main = document.getElementById("main")
const loadMoreButton = document.getElementById("loadMore")
const width = document.documentElement.clientWidth

main.style.width =`${width}px`
main.style.height =`${width*1.2}px`
if (width>=500){
  main.style.width ='600px'
  main.style.height ='400px'
}
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(main, "light")
let n = 0
let m = 0

function createKey() {
  n += 1
  return `202${n}`
}

function createValue() {
  m += 1
  return m
}

let xData = [createKey(), createKey(), createKey(), createKey()]
let values = [createValue(), createValue(), createValue(), createValue()]
// 绘制图表
myChart.setOption({
  baseOption: {
    title: {
      text: "wode",
        show: true,
        right: 60
    },
    legend: {
      data: ["bug数"]
    },
    tooltip: {
      show: true
    },
    xAxis: {
      type: "category",
        data: xData
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        lineStyle: {
          color: "blue",
          width: 5,
        },
        symbolSize: 10,
        name: "bug数",
        data: values,
        type: "line"
      }
    ]
  },
  media:[
    {
      query:{
        maxWidth:500
      },
      option:{
        series: [
          {
            symbolSize: 30,
          }
        ]
      }
    }
  ]
  })


let isLoading = false
loadMoreButton.addEventListener(
  "click", () => {
    if (isLoading === true) {return}
    myChart.showLoading()
    isLoading = true
    setTimeout(() => {
      const key = "2026"
      const value = 7
      xData = [...xData, createKey()]
      values = [...values, createValue()]
      myChart.setOption({
        xAxis: {
          data: xData
        },
        series: [
          {
            data: values
          }
        ]
      })
      myChart.hideLoading()
      isLoading =false
    }, 1000)
  }
)

myChart.on('click',(x)=>{
  window.alert(x.data)
})