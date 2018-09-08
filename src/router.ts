import Vue from 'vue';
import Router from 'vue-router';
import Summary from './views/summary.vue';

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
      component: () => import('./views/settings.vue'),
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('./views/timeline.vue'),
    },
  ],
});
