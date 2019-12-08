<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  extends: Bar,
  props: ['lotMargin'],
  mounted () {
    Chart.defaults.scale.ticks.beginAtZero = true // eslint-disable-line
    this.renderBarChart()
  },
  computed: {
    chartData () {
      return this.lotMargin
    }
  },
  watch: {
    lotMargin: function () {
      this.$data._chart.data.datasets[0].data = this.lotMargin // inicializa
      this.$data._chart.update()
      this.renderBarChart()
    }
  },
  methods: {
    renderBarChart: function () {
      this.renderChart(
        {
          labels: ['Gross', 'Oper', 'Profit'],
          datasets: [
            {
              label: 'Margin', // grafico ebit
              data: this.chartData, // conjunto de datos
              backgroundColor: ['rgba(88, 24, 164, 0.6)', 'rgba(26, 7, 237, 0.6)', 'rgba(181, 33, 86, 0.6)'],
              borderColor: ['#4A148C', '#0e06a6', '#cd0d51'],
              borderWidth: 2
            }
          ]
        },
        {
          title: {
            display:true,
            text:'Margin (%)',
            fontSize:20
          },
          legend: {
            display:true,
            position:'top',
            labels: {
              fontColor:'#363636'
            }
          },
          tooltips: {
            callbacks: {
              label (tooltipItem, data) { // // eslint-disable-line
                //console.log(data) // eslint-disable-line no-console
                let value = tooltipItem.yLabel
                let label = data.datasets[tooltipItem.datasetIndex].label || '' // string value
                if (label) { label += ':'; }
                return label += Math.abs(Number(value)) + '%'
              }
            }
          },
          scales: {
            yAxes: [{
              ticks: { // value format yAxis
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                maxBarThickness: 8,
                minBarLength: 2,
                gridLines: {
                  offsetGridLines: true
                }

              }
            }]
          }
        }
      )
    }
  }
}
</script>

<style scoped>
</style>
