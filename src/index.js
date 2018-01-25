import Semver from 'semver'
import { peerDependencies, version } from '../package.json'
import * as components from './components'
import * as directives from './directives'
import { consoleWarn } from './util/console'

function Akame (Vue, args) {
  const Akame = components.Akame

  Vue.use(Akame, {
    components,
    directives,
    ...args
  })
}

Akame.version = version

function checkVueVersion () {
  const vueDep = peerDependencies.vue
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    consoleWarn(`Akame requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Akame)
}

export default Akame
