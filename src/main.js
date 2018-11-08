// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App';
import router from './router';
import FolderUpload from './components/folder-upload';

if (window.Promise && !window.Promise.prototype.finally) {
  window.Promise.prototype.finally = callback => (
    this.then(
      value => this.constructor.resolve(callback()).then(() => value),
      reason => this.constructor.resolve(callback()).then(() => { throw reason; }),
    )
  );
}

Vue.use(ElementUI);
Vue.use(FolderUpload);

const http =
  process.env.NODE_ENV === 'development' ?
    axios.create({ baseURL: 'http://localhost:3000/' }) : // dev
    axios; // prod

const copyToClipboard = (dom, str) => {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', str);
  dom.appendChild(input);
  input.setSelectionRange(0, 9999);
  input.focus();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  dom.removeChild(input);
};

Vue.prototype.$http = http;
Vue.prototype.$copyString = copyToClipboard;

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
