<template>
  <v-app>
    <app-toolbar></app-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import AppFooter from './components/AppFooter'
import AppToolbar from './components/AppToolbar'

export default {
  name: 'App',
  components: { AppFooter, AppToolbar },
  data () {
    return {
      //
    }
  }
}
</script>
