<template>
  <v-container class="container" grid-list-md>
    <v-layout row wrap>
      <v-flex xs12> <!-- 1er container: datos informativos de las compañías  -->
        <v-card flat class="line" style="border-top:1px solid rgb(201, 201, 201)">
          <v-card-text>
            <div class="flex-container">
              <div>
                <div>
                  <span class="gray_header">
                    {{ elements.elements.symbol }} {{ elements.elements.exchange }}
                  </span>
                  <h3>
                    <a
                    href="elements.elements.website"
                    class="decorative"
                    target="_blank">
                    {{ elements.elements.companyName }}
                    </a>
                  </h3>
                  <span
                    v-show="covert"
                    class="gray_header">
                    CEO: {{ elements.elements.CEO }}
                  </span>
                </div>
                <div>
                  <span v-show="covert" class="a">${{ elements.quote.latestPrice }}</span>
                  &nbsp;
                  <v-icon :class="colorPrice">{{ arrowDirection }}</v-icon>
                  <span :class="colorPrice">{{ removeSing(elements.quote.change) }}</span>
                  <span v-show="covert" :class="colorPrice">({{ removeSing(elements.quote.changePercent) }}%)</span>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- Fin del 1er container -->

      <v-divider></v-divider>

      <v-flex xs12> <!-- 2do container de datos finz -->
        <v-card flat class="line">
          <v-card-text>
            <div class="containerData" v-show="covert">
              <div>
                <div class="dp-name">Bid Price</div>
                <div class="dp-value">{{ elements.quote.iexBidPrice }}</div>
              </div>
              <div>
                <div class="dp-name">Ask Price</div>
                <div class="dp-value">{{ elements.quote.iexAskPrice }}</div>
              </div>
              <div>
                <div class="dp-name">Volume</div>
                <div class="dp-value">{{ valuewithComa(elements.quote.latestVolume) }}</div>
              </div>
              <div>
                <div class="dp-name">Market Cap</div>
                <div class="dp-value">{{ moneyFormat(elements.quote.marketCap) }}</div>
              </div>
              <div>
                <div class="dp-name">Price/Earnings</div>
                <div class="dp-value">{{ elements.quote.peRatio }}</div>
              </div>
              <div>
                <div class="dp-name">Avg Volume</div>
                <div class="dp-value">{{ valuewithComa(elements.quote.avgTotalVolume) }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- Fin del 2do container -->

      <v-flex xs12> <!-- 3er container: descripción sobre las compañía -->
        <v-card flat class="line">
          <v-card-text>
            <h3 v-show="covert">About</h3>
            <p>{{ elements.elements.description }}</p>
          </v-card-text>
        </v-card>
      </v-flex>
      <!-- Fin del 3er container -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AppMain',
  props: {
    elements: {
      type: Object
    }
  },
  data () {
    return {
      //
    }
  },
  methods: {
    removeSing (valueStock) { // remueve signo de los valores
      if (!valueStock) return ''
      let valueAlter = valueStock.toFixed(2).match(/\d+(\.\d{2})/g).join(' ')
      return valueAlter
    },
    valuewithComa (x) { // pone comas en valores de volumen de compra
      if (!x) return '' // repara el error de variable null por defecto
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    moneyFormat (capitalValue) { // Da formato a las cantidad en millones
      if (!capitalValue) return ''
      return Math.abs(Number(capitalValue)) >= 1.0e+9
        ? (Math.abs(Number(capitalValue)) / 1.0e+9).toFixed(1) + 'B'
        : Math.abs(Number(capitalValue)) >= 1.0e+6
          ? (Math.abs(Number(capitalValue)) / 1.0e+6).toFixed(1) + 'M'
          : Math.abs(Number(capitalValue)) >= 1.0e+3
            ? (Math.abs(Number(capitalValue)) / 1.0e+3).toFixed(1) + 'K'
            : Math.abs(Number(capitalValue))
    }
  },
  computed: {
    covert () {
      if (this.elements.elements.tags) {
        return true
      } else {
        return false
      }
    },
    colorPrice () {
      let price = this.elements.quote.change
      if (!price) return '' // repara el error de variable null por defecto
      let stringPriceIdx = price.toString().indexOf('-')
      if (stringPriceIdx !== -1) {
        return 'redPrice'
      } else {
        return 'greenPrice'
      }
    },
    arrowDirection () {
      let simbol = this.elements.quote.change
      if (!simbol) return ''
      let arrowPrice = simbol.toString().indexOf('-')
      if (arrowPrice !== -1) {
        return 'arrow_drop_down'
      } else {
        return 'arrow_drop_up'
      }
    }
  }
}
</script>

<style scoped>

.container {
  margin: 0 auto;
  width: 90%;
  max-width: 75rem;
}

.decorative {
  text-decoration: none; /* elimina el subrayado */
  font-size: 1.5rem;
  color: #000
}

a:hover {
  background-color: #e0f0ff; /* sombreado */
}

img {
  max-width: 70%;
  height: auto;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
}

.flex-prices {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.gray_header {
  color: gray;
  font-weight: bold;
}

.a {
  padding-top: 3px;
  font-size: 1.5rem;
  font-weight: bold;
}

.redPrice {
  font-size: 1.5rem;
  font-weight: 700;
  color: #aa0000;
}

.greenPrice {
  font-size: 1.5rem;
  font-weight: 700;
  color: #008800;
}

.containerData {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-auto-rows: 100px;
}

.containerData > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1em;
}

.dp-name {
  font-size: 14px;
  font-weight: 600;
}

.dp-value {
  font-size: 18px;
  font-weight: 300;
}

.line {
  border-bottom: 1px solid rgb(201, 201, 201);
}
</style>
