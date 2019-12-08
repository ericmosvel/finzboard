
<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  extends: Bar,
  props: ['fullAssets', 'fullLiabili'],
  mounted () {
    Chart.defaults.scale.ticks.beginAtZero = true // eslint-disable-line
    this.renderBarChart()
  },
  computed: {
    chartData1 () {
      return this.fullAssets
    },
    chartData2 () {
      return this.fullLiabili
    }
  },
  watch: {
    fullAssets: function () {
      this.$data._chart.data.datasets[0].data = this.fullAssets // inicializa
      this.$data._chart.data.datasets[1].data = this.fullLiabili // inicializa
      this.$data._chart.update()
      this.renderBarChart()
    }
  },
  methods: {
    renderBarChart: function () {
      this.renderChart(
        {
          labels: ['2015', '2016', '2017', '2018'],
          datasets: [
            {
              label: 'Assets', // grafico 1
              data: this.chartData1, // conjunto de datos
              backgroundColor: 'rgba(88, 24, 164, 0.6)',
              borderColor: '#4A148C',
              borderWidth: 2
            },
            {
              label: 'Liabilities', // grafico 2
              data: this.chartData2, // conjunto de datos
              backgroundColor: 'rgba(181, 33, 86, 0.6)',
              borderColor: '#cd0d51',
              borderWidth: 2
            }
          ]
        },
        {
          title: {
            display:true,
            text:'Balance Sheet',
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
                let value = tooltipItem.yLabel // numeric value
                let label = data.datasets[tooltipItem.datasetIndex].label || '' // string value
                if (label) { label += ':'; }
                return label += Math.abs(Number(value)) >= 1.0e+9
                ? '$' + (Math.abs(Number(value)) / 1.0e+9).toFixed(1) + "B"
                  : Math.abs(Number(value)) >= 1.0e+6
                ? '$' + (Math.abs(Number(value)) / 1.0e+6).toFixed(1) + "M"
                  : Math.abs(Number(value)) >= 1.0e+3
                ? '$' + (Math.abs(Number(value)) / 1.0e+3).toFixed(1) + "K"
                  : Math.abs(Number(value));
              }
            }
          },
          scales: {
            yAxes: [{
              ticks: { // value format yAxis
                callback (value) {
                  return Math.abs(Number(value)) >= 1.0e+9
                    ? '$' + (Math.abs(Number(value)) / 1.0e+9).toFixed(1) + "B"
                      : Math.abs(Number(value)) >= 1.0e+6
                    ? '$' + (Math.abs(Number(value)) / 1.0e+6).toFixed(1) + "M"
                      : Math.abs(Number(value)) >= 1.0e+3
                    ? '$' + (Math.abs(Number(value)) / 1.0e+3).toFixed(1) + "K"
                      : Math.abs(Number(value));
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
