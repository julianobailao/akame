import application from './mixins/application'
import goTo from './mixins/goTo'
import theme from './mixins/theme'
import options from './mixins/options'

const Akame = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    const $akame = {}
    Vue.util.defineReactive($akame, 'inspire', {
      breakpoint: {},
      application,
      dark: false,
      theme: theme(opts.theme),
      options: options(opts.options),
      goTo
    })

    Vue.prototype.$akame = $akame.inspire

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(transition => {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition)
        }
      })
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(directive => {
        Vue.directive(directive.name, directive)
      })
    }

    if (opts.components) {
      Object.values(opts.components).forEach(component => {
        Vue.use(component)
      })
    }
  }
}

export default Akame
