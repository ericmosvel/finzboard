
<script>
export default {
  name: 'AppNews',
  props: {
    elements: {
      type: Object,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      // items: this.elements.news
    }
  },
  methods: {
    stringDate (string) {
      if (!string) return '' // valida existencia del objeto string
      let str = (new Date(string)).toString() // pasa a formato fecha
      let sliceString = str.split('').slice(4, 21).join('') // extrae el dato a mostrar
      return sliceString
    }
  },
  render (h) {
    var self = this
    if (!this.elements.news) { // Si existen elementos en news seguir
      return h('p', 'Not items found. ')
    } else {
      return h('ul', { attrs: { id: 'wraper' } }, this.elements.news.map((item) => {
        return h('li', [ // con h creo un nuevo elemento
          h('i', {
            class: {
              dateFormater: true
            }
          }, self.stringDate(item.datetime)),
          h('a', {
            attrs: {
              href: item.url
            },
            class: {
              decorative: true,
              a: true
            }
          }, item.headline),
          h('small', {
            class: {
              marginLeft: true
            }
          }, item.source)
        ])
      }))
    }
  }
}
</script>

<style scoped>

.decorative {
  text-decoration: none; /* elimina el subrayado */
}

a:hover {
  background-color: #e0f0ff; /* sombreado */
}

#wraper {
  list-style-type: none; /* elimina las viñetas */
}

.marginLeft {
  color: #aa6dc0;
  margin-left: 5px;
}

.dateFormater {
  color: #1E6DC0;
  margin-right: 5px;
}

</style>
