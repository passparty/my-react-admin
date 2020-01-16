
// ref: https://umijs.org/config/
export default {
  disableCSSModules: true,
  treeShaking: true,
  routes: [{
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        path: '/',
        component: './exampletwo',
      }, {
        path: '/home',
        component: './exampletwo',
      }, {
        path: '/laptop/list',
        name:'404',
        component: './example',
      }, {
        path: '/laptop/gobang',
        component: './gobang',
      }, {
        path: '/edit/form/adminform',
        component: './example',
      }, {
        path: '/edit/form/stepform',
        component: './gobang',
      }, {
        path: '/edit/admin',
        component: './gobang',
      }, {
        path: '/admin',
        component: './example',
      },]
  }],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,

      dynamicImport: false,
      title: 'sbd',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
