import Vue from 'vue'

function isCssColor (color) {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorize',
  
  props: {
    color: {
      type: String,
      default: 'white'
    },
    backgroundColor: {
      type: String,
      default: 'blue'
    }
  },
  
  methods: {
    setBothColors (color, bgColor, data = {}) {
      return this.setTextColor(color, this.setBackgroundColor(bgColor, data))
    },
    
    setBackgroundColor (color, data = {}) {
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        }
      } else if (color) {
        const colorName = color.toString().trim()
        data.class = {
          ...data.class,
          ['bg-' + colorName]: true
        }
        console.log(data.class)
      }
      
      return data
    },
    
    setTextColor (color, data = {}) {
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'color': `${color}`,
          'caret-color': `${color}`
        }
      } else if (color) {
        const colorName = color.toString().trim()
        data.class = {
          ...data.class,
          ['text-' + colorName]: true
        }
      }
      return data
    }
  }
})