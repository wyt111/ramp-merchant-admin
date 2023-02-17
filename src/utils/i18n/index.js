import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: sessionStorage.getItem('language') ? sessionStorage.getItem('language') : 'en',
  messages: {
    'en': require('./language/EN'),
    'zh': require('./language/ZH')
  }
})
export default i18n
