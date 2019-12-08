<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 v-show="covert" style="font-size: 1.5rem">Key Statistics</h3>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text>
            <div class="containerData" v-show="covert">
              <div class="box">
                <div style="border-top:1px dotted">
                  <span class="itemL">Shares Outstanding</span>
                  <span class="itemR">{{ millionFormat(elements.stats.sharesOutstanding) }}</span>
                </div>
                <div>
                  <span class="itemL">Shares Float</span>
                  <span class="itemR">{{ millionFormat(elements.stats.float) }}</span>
                </div>
                <div>
                  <span class="itemL">SMA50</span>
                  <span class="itemR">{{ elements.stats.day50MovingAvg }}</span>
                </div>
                <div>
                  <span class="itemL">SMA200</span>
                  <span class="itemR">{{ elements.stats.day200MovingAvg }}</span>
                </div>
              </div>
              <div class="box">
                <div class="rowList">
                  <span class="itemL">Employees</span>
                  <span class="itemR">{{ valuewithComa(elements.stats.employees) }}</span>
                </div>
                <div>
                  <span class="itemL">EPS (ttm)</span>
                  <span class="itemR">{{ pricetoBook(elements.stats.ttmEPS) }}</span>
                </div>
                <div>
                  <span class="itemL">Dividend Rate (ttm)</span>
                  <span class="itemR">{{ pricetoBook(elements.stats.ttmDividendRate) }}</span>
                </div>
                <div>
                  <span class="itemL">Dividend Yield</span>
                  <span class="itemR">{{ pricetoBook(elements.stats.dividendYield) }}</span>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <v-card flat>
          <v-card-text v-show="covert">
            <div>
              <h4>Long Term Investment</h4>
            </div>
            &nbsp;
            <div class="heatContainer">
              <div :class="colorFiveYr">
                <span>{{ fixPerformance(elements.stats.year5ChangePercent) }}</span>
                <small>5y</small>
              </div>
              <div :class="colorTwoYr">
                <span>{{ fixPerformance(elements.stats.year2ChangePercent) }}</span>
                <small>2y</small>
              </div>
              <div :class="colorOneYr">
                <span>{{ fixPerformance(elements.stats.year1ChangePercent) }}</span>
                <small>1y</small>
              </div>
              <div :class="colorYdtYr">
                <span>{{ fixPerformance(elements.stats.ytdChangePercent) }}</span>
                <small>ydt</small>
              </div>
              <div :class="colorSixMon">
                <span>{{ fixPerformance(elements.stats.month6ChangePercent) }}</span>
                <small>6m</small>
              </div>
              <div :class="colorThreeMon">
                <span>{{ fixPerformance(elements.stats.month3ChangePercent) }}</span>
                <small>3m</small>
              </div>
              <div :class="colorMonth">
                <span>{{ fixPerformance(elements.stats.month1ChangePercent) }}</span>
                <small>1m</small>
              </div>
              <div :class="colorDay">
                <span>{{ fixPerformance(elements.stats.day30ChangePercent) }}</span>
                <small>30d</small>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AppStats',
  props: ['elements'],
  data () {
    return {
      colorBackground: ''
    }
  },
  methods: {
    valuewithComa (x) {
      if (!x) return ''
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    pricetoBook (x) {
      if (!x) return ''
      return x.toFixed(2)
    },
    fixPerformance (value) {
      if (!value) return ''
      return (value * 100).toFixed(2) + '%'
    },
    millionFormat (z) { // Da formato a las cantidad en millones
      if (!z) return ''
      return Math.abs(Number(z)) >= 1.0e+9
        ? (Math.abs(Number(z)) / 1.0e+9).toFixed(2) + 'B'
        : Math.abs(Number(z)) >= 1.0e+6
          ? (Math.abs(Number(z)) / 1.0e+6).toFixed(2) + 'M'
          : Math.abs(Number(z)) >= 1.0e+3
            ? (Math.abs(Number(z)) / 1.0e+3).toFixed(2) + 'K'
            : Math.abs(Number(z))
    },
    colorMachine (x) {
      if (x <= -0.3) {
        return 'redD'
      } else if (x <= -0.2 && x > -0.3) {
        return 'redC'
      } else if (x <= -0.1 && x > -0.2) {
        return 'redB'
      } else if (x <= 0 && x > -0.1) {
        return 'redA'
      } else if (x > 0 && x < 0.1) {
        return 'gray'
      } else if (x >= 0.1 && x < 0.2) {
        return 'greenA'
      } else if (x >= 0.2 && x < 0.3) {
        return 'greenB'
      } else {
        return 'greenC'
      }
    }
  },
  computed: {
    colorFiveYr () {
      let value = this.elements.stats.year5ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorTwoYr () {
      let value = this.elements.stats.year2ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorOneYr () {
      let value = this.elements.stats.year1ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorYdtYr () {
      let value = this.elements.stats.ytdChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorSixMon () {
      let value = this.elements.stats.month6ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorThreeMon () {
      let value = this.elements.stats.month3ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorMonth () {
      let value = this.elements.stats.month1ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    colorDay () {
      let value = this.elements.stats.day30ChangePercent
      if (!value) return ''
      return this.colorMachine(value)
    },
    covert () {
      if (this.elements.stats.companyName) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>

.greenC {
  background-color: #30cc5a;
}

.greenB {
  background-color: #2f9e4f;
}

.greenA {
  background-color: #35764e;
}

.gray {
  background-color: #275236;
}

.redA {
  background-color: #8b444e;
}

.redB {
  background-color: #cd4045;
}

.redC {
  background-color: #f63538;
}

.redD {
  background-color: #f61c20;
}

.containerData {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: auto;
}

@media screen and (max-width: 767px) { /* Media querry responsive menu for size */
  .containerData {
    display: grid;
    grid-gap: 0px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-auto-rows: auto;
  }
}

.box {
  display: grid;
  grid-gap: 0px;
  grid-template-columns: 1fr;
  grid-auto-rows: 30px;
}

.box > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  border-bottom: 1px dotted;
}

.rowList:first-child {
  border-top: 1px dotted;
}

@media screen and (max-width: 767px) { /* Media querry responsive menu for size */
  .rowList:first-child {
    border-top: none;
  }
}

.itemL {
  font-weight: 600;
  padding-left: 10px;
}

.itemR {
  padding-right: 10px;
}

/* heatmap */
.heatContainer {
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  grid-auto-rows: 60px;
}

.heatContainer > div {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* border: 1px solid #161616;
  border-radius: 5px; */
}

small {
  position: absolute;
  bottom: 2px;
}

</style>
