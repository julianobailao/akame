import '../../stylus/components/_buttons.styl'
import rippleable from '../../mixins/rippleable'

export default {
  name: 'k-button',

  mixins: [
    rippleable
  ],

  computed: {
    classes () {
      return {
        'k-button': true,
        'ripple': true
      }
    }
  },

  methods: {
    click (e) {
      !this.fab &&
        e.detail &&
        this.$el.blur()

      this.$emit('click', e)
    }
  },

  render (h) {
    return h('button', {class: this.classes}, this.$slots.default)
  }
}
