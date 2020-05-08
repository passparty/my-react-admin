/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Party
 * @Date: 2020-01-16 10:20:45
 * @LastEditors: Party
 * @LastEditTime: 2020-05-08 15:16:52
 */

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
        component: './home',
      }, {
        path: '/home',
        component: './home',
      }, {
        path: '/admin',
        component: './admin',
      },]
  }],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,

      dynamicImport: false,
      title: 'manage',
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
