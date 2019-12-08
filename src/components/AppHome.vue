<template>
  <v-layout mt-4>
    <v-flex xs12 sm8 offset-sm2>
      <v-card class="elevation-5">
        <v-tabs
          dark
          color="deep-purple darken-4"
          fixed-tabs
          v-model="tab"
        >
          <v-tabs-slider color="amber darken-3"></v-tabs-slider>
          <v-tab
            v-for="(item, index) in items"
            :class="{active: currentTab === index}"
            @click="currentTab = index"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-card flat>
            <div v-show="currentTab === 0">
              <v-card-text><app-main :elements="{elements, quote}"></app-main></v-card-text>
            </div>
            <div v-show="currentTab === 1">
              <v-container class="container" grid-list-md>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-card flat>
                      <bar-chart
                        v-if="loaded"
                        :dataChart_Reve="totalRevenue"
                        :dataChart_Income="netIncome">
                      </bar-chart>
                    </v-card>
                  </v-flex>
                  <v-flex xs6>
                    <v-card flat>
                      <ebit-chart
                        v-if="loaded"
                        :ebitArray="ebitData">
                      </ebit-chart>
                    </v-card>
                  </v-flex>
                  <v-flex xs6>
                    <v-card flat>
                      <margin-chart
                        v-if="loaded"
                        :lotMargin="gross">
                      </margin-chart>
                    </v-card>
                  </v-flex>
                  <v-flex xs6>
                    <v-card flat>
                      <balance-chart
                        v-if="loaded"
                        :fullAssets="allAssets"
                        :fullLiabili="allLiabili">
                      </balance-chart>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
            <div v-show="currentTab === 2">
              <v-card-text><app-stats :elements="{stats}"></app-stats></v-card-text>
            </div>
            <div v-show="currentTab === 3">
              <v-card-text><app-news :elements="{news}"></app-news></v-card-text>
            </div>
          </v-card>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'
import AppMain from '../views/AppMain.vue'
import AppNews from '../views/AppNews.vue'
import AppStats from '../views/AppStats.vue'
import BarChart from '../views/BarChart.vue'
import EbitChart from '../views/EbitChart.vue'
import MarginChart from '../views/MarginChart.vue'
import BalanceChart from '../views/BalanceChart.vue'
export default {
  name: 'AppHome',
  data () {
    return {
      currentTab: 0,
      tab: null,
      items: ['main', 'financial', 'stats', 'news'],
      loaded: false,
      elements: [],
      stats: [],
      finz: [],
      news: [],
      quote: [],
      totalRevenue: [],
      netIncome: [],
      ebitData: [],
      gross: [],
      allAssets: [],
      allLiabili: [],
      DebtToAssets: []
    }
  },
  watch: { // watcher padre selecciona los datos q se van a trazar
    finz: function (newVal, oldVal) { // eslint-disable-line
      this.totalRevenue = []
      this.costOfRevenue = []
      this.ebitData = []
      this.gross = []
      this.allAssets = []
      this.allLiabili = []
      this.DebtToAssets = []
      var array = newVal.financials
      this.loaded = false
      this.valueMargin(newVal.financials[0])
      var total_revenue = array.map((value) => { return value.totalRevenue }).reverse()
      var net_income = array.map((value) => { return value.netIncome }).reverse()
      var ebit = array.map((value) => {return value.operatingIncome}).reverse()
      var assets = array.map((value) => {return value.totalAssets}).reverse()
      var liabil = array.map((value) => {return value.totalLiabilities}).reverse()
      var debt_assets = assets.map((value, index) => { return ((liabil[index]/value)*100).toFixed(2) })
      this.totalRevenue = total_revenue
      this.netIncome = net_income
      this.ebitData = ebit
      this.allAssets = assets
      this.allLiabili = liabil
      this.DebtToAssets = debt_assets
      this.loaded = true
      console.log(this.DebtToAssets) // eslint-disable-line no-console
    }
  },
  methods: {
    valueMargin (value) {
      let valueGross = ((value.grossProfit / value.totalRevenue) * 100).toFixed(2)
      let valueOper = ((value.operatingIncome/value.totalRevenue) * 100).toFixed(2)
      let valueProfit = ((value.netIncome/value.totalRevenue) * 100).toFixed(2)
      this.gross.push(valueGross, valueOper, valueProfit)
      // console.log(this.gross) // eslint-disable-line no-console
    }
  },
  created () {
    eventBus.$on('ticker', (symbol) => {
      let self = this
      let ticker = symbol
      // const token = 'pk_ca1c578ddd514837a784132d1e408809' // production
      const token = 'Tpk_2065b975541444d089e1160434a08f9b' // test
      function getElements () {
        return axios.get(`https://sandbox.iexapis.com/beta/stock/${ticker}/company?token=${token}`)
      }
      function getKeyStats () {
        return axios.get(`https://sandbox.iexapis.com/beta/stock/${ticker}/stats?token=${token}`)
      }
      function getFinancial () {
        return axios.get(`https://sandbox.iexapis.com/beta/stock/${ticker}/financials/4?token=${token}&period=annual`)
      }
      function getNews () {
        return axios.get(`https://sandbox.iexapis.com/beta/stock/${ticker}/news/last/5?filter=datetime,headline,source,url&token=${token}`)
      }
      function getQuote () {
        return axios.get(`https://sandbox.iexapis.com/beta/stock/${ticker}/quote?displayPercent=true&token=${token}`)
      }
      axios.all([getElements(), getKeyStats(), getFinancial(), getNews(), getQuote()])
        .then(axios.spread(function (response, stats, finz, news, quote) {
          self.elements = response.data
          self.stats = stats.data
          self.finz = finz.data
          self.news = news.data
          self.quote = quote.data
          // console.log(finz.data, response.data) // eslint-disable-line no-console
        }))
    })
  },
  components: {
    AppMain,
    AppNews,
    AppStats,
    BarChart,
    EbitChart,
    MarginChart,
    BalanceChart
  }
}
</script>

<style scoped>

.container {
  margin: 0 auto;
  width: 90%;
  max-width: 75rem;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

</style>
