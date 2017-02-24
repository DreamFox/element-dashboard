import Vue from 'vue';
import NotFound from './pages/common/404';

// list with filters page
import ListWithFilters from './pages/list/with-filters';
import AddActivity from './pages/form/big-form';
import Login from './pages/login/login';

const root = Vue.component('root', {
  template: '<router-view></router-view>'
});

let routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: root,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: '参与用户',
        component: ListWithFilters
      },
      {
        path: 'edit',
        name: '奖品设置',
        component: AddActivity
      }
    ]
  },
  {
    path: '*',
    redirect: {path: '/404'}
  }
];
let menuCount = routes.length;
routes[menuCount - 2].children.forEach(route => {
  if (route.children) {
    if (!route.meta) route.meta = {};
    route.meta.children = route.children;
  }
});

export default routes;
