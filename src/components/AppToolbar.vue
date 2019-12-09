<template>
  <v-toolbar color="deep-purple darken-4" dark>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <router-link to="/" class="wraperLink">
      <v-toolbar-title class="white--text">Finzboard</v-toolbar-title>
    </router-link>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      v-model="select"
      v-on:change="validateInfo"
      :filter = "(item, queryText, itemText) => { // filtro Case sensitivo
        const textOne = item.name.toUpperCase()
        const searchText = queryText.toUpperCase()
        return textOne.indexOf(searchText) > -1
        }"
      cache-items
      class="mx-3"
      item-text="name"
      clearable
      chips
      hide-selected
      hide-details
      label="Search a company"
      solo-inverted>
      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-title>
            Search for your
            <strong>Company</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template
        slot="selection"
        slot-scope="{ item, selected }">
        <v-chip
          color="deep-purple darken-4"
          class="white--text"
          :selected="selected">
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.label"></span>
        </v-chip>
      </template>
        <template
          slot="item"
          slot-scope="{ item }">
          <v-list-tile-avatar
            color="deep-purple darken-4"
            class="headline font-weight-light white--text">
            {{ item.label.charAt(0) }}
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.label"></v-list-tile-title>
            <v-list-tile-sub-title v-text="item.symbol"></v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>mdi-coin</v-icon>
          </v-list-tile-action>
        </template>
    </v-autocomplete>
    <v-spacer></v-spacer>
    <div class="hidden-sm-and-down">
      <v-btn flat>Maps</v-btn>
      <router-link to="/about" class="wraperLink">
        <v-btn flat>About</v-btn>
      </router-link>
    </div>
  </v-toolbar>
</template>

<script>
import { getCompanyInfo } from '@/services/request'
import { eventBus } from '../main'
export default {
  name: 'AppToolbar',
  data () {
    return {
      loading: false,
      items: [],
      search: '',
      select: ''
    }
  },
  watch: {
    search (val) {
      if (!val) return ''
      if (val.length > 2) {
        setTimeout(() => {
          val && val !== this.select && this.querySelector()
        }, 1000)
      }
    }
  },
  methods: {
    querySelector () {
      this.loading = true
      getCompanyInfo().then(response => {
        const infoData = response.data.map(data => {
          return {
            name: `${data.symbol} ${data.name}`,
            label: data.name,
            symbol: data.symbol,
            type: data.type
          }
        }) // falta agregar otro parametro de filtrado 'ad' para abarcas mas empresas
        this.items = infoData // .filter(data => data.type === 'cs')
        // console.log(infoData) // eslint-disable-line no-console
      }).catch( error => { // eslint-disable-line no-console
        console.log(error) // eslint-disable-line no-console
      }).finally(() => (this.loading = false))
    },
    validateInfo (data) {
      if (!data) { // Si data es falsy retornar null
        return null
      } else {
        let symbol = data.split(' ')
        eventBus.$emit('ticker', symbol[0]) // emito evento 'ticker' a home
      }
    }
  }
}
</script>

<style scoped>

.wraperLink {
  text-decoration: none; /* elimina el subrayado */
}

</style>
