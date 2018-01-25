import { intToHex } from '../../../util/colorUtils'
import * as Theme from '../../../util/theme'

export default {
  data: () => ({
    style: null
  }),

  computed: {
    parsedTheme () {
      return Theme.parse(this.$akame.theme)
    }
  },

  watch: {
    parsedTheme () {
      this.applyTheme()
    }
  },

  created () {
    if (typeof document === 'undefined' && this.$ssrContext) {
      if (!this.$ssrContext._styles) this.$ssrContext._styles = {}
      this.$ssrContext._styles['akame-theme-stylesheet'] = {
        ids: ['akame-theme-stylesheet'],
        css: this.genColors(this.parsedTheme),
        media: ''
      }
      return
    }
    this.genStyle()
    this.applyTheme()
  },

  methods: {
    applyTheme () {
      this.style.innerHTML = this.genColors(this.parsedTheme)
    },
    genColors (theme) {
      let css

      if (this.$akame.options.themeCache != null) {
        css = this.$akame.options.themeCache.get(theme)
        if (css != null) return css
      }

      const colors = Object.keys(theme)
      css = `a { color: ${intToHex(theme.primary)}; }`

      for (let i = 0; i < colors.length; ++i) {
        const name = colors[i]
        const value = theme[name]
        if (this.$akame.options.themeVariations.includes(name)) {
          css += Theme.genVariations(name, value).join('')
        } else {
          css += Theme.genBaseColor(name, value)
        }
      }

      if (this.$akame.options.minifyTheme != null) {
        css = this.$akame.options.minifyTheme(css)
      }

      if (this.$akame.options.themeCache != null) {
        this.$akame.options.themeCache.set(theme, css)
      }

      return css
    },
    genStyle () {
      let style = document.querySelector('[data-vue-ssr-id=akame-theme-stylesheet]') ||
        document.getElementById('akame-theme-stylesheet')

      if (!style) {
        style = document.createElement('style')
        style.type = 'text/css'
        style.id = 'akame-theme-stylesheet'
        document.head.appendChild(style)
      }

      this.style = style
    }
  }
}
