import { factory as PositionableFactory } from './positionable'

export default function applicationable (value, events = []) {
  return {
    name: 'applicationable',

    mixins: [PositionableFactory(['absolute', 'fixed'])],

    props: {
      app: Boolean
    },

    computed: {
      applicationProperty () {
        return value
      }
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app (x, prev) {
        prev
          ? this.removeApplication()
          : this.callUpdate()
      }
    },

    created () {
      for (let i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate)
      }
    },

    mounted () {
      this.callUpdate()
    },

    destroyed () {
      this.app && this.removeApplication()
    },

    methods: {
      callUpdate () {
        if (!this.app) return

        this.$akame.application[this.applicationProperty] = this.updateApplication()
      },
      removeApplication () {
        this.$akame.application[this.applicationProperty] = 0
      },
      updateApplication: () => {}
    }
  }
}
