<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  extends: Bar,
  props: ['ebitArray'],
  mounted () {
    Chart.defaults.scale.ticks.beginAtZero = true // eslint-disable-line
    this.renderBarChart()
  },
  computed: {
    chartData () {
      return this.ebitArray
    }
  },
  watch: {
    ebitArray: function () {
      this.$data._chart.data.datasets[0].data = this.ebitArray // inicializa
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
              label: 'Ebit', // grafico ebit
              data: this.chartData, // conjunto de datos
              backgroundColor: 'rgba(88, 24, 164, 0.6)',
              borderColor: '#4A148C',
              borderWidth: 2
            }
          ]
        },
        {
          title: {
            display:true,
            text:'Ebit',
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
