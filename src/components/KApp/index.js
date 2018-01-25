import KApp from './KApp'

/* istanbul ignore next */
KApp.install = function install (Vue) {
  Vue.component(KApp.name, KApp)
}

export default KApp
