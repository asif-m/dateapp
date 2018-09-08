import Vue from 'vue';
import Router from 'vue-router';
import Summary from './components/summary.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summary,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./components/settings.vue'),
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('./components/timeline.vue'),
    },
  ],
});
