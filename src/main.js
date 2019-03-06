import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import Router from 'vue-router'
import NProgress from 'nprogress'; // progress bar
import enLocale from '@/locale/en'
import zhLocale from '@/locale/zh-CN'
import enEleLocale from 'element-ui/lib/locale/lang/en'
import zhEleLocale from 'element-ui/lib/locale/lang/zh-CN'
import routes from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/styles/index.scss'
import 'nprogress/nprogress.css'; // progress bar style
import App from './App.vue'
//引入svg组件
import IconSvg from '@/components/icon-svg'

//全局注册icon-svg
Vue.component('icon-svg', IconSvg)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('@/assets/icons', true, /\.svg$/)
requireAll(req)

Vue.use(VueI18n);
Vue.use(Router);
Vue.use(Element, { size: 'medium', i18n: (key, value) => { i18n.t(key, value) } });

GLOBAL.vbus = new Vue();

const messages = {
  en: {
    ...enLocale,
    ...enEleLocale
  },
  zh: {
    ...zhLocale,
    ...zhEleLocale
  }
};

const i18n = new VueI18n(
  {
    locale: 'en',
    messages
  }
);

const router = new Router({
  routes,
  scrollBehavior: () => ({ y: 0 }),
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(record => record.meta.requiredAuth)) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
      NProgress.done();
    }
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')
