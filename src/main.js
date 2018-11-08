import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './polyfills';

import App from './App';
import router from './router';
// import FolderUpload from './components/folder-upload';

Vue.use(ElementUI);
// Vue.use(FolderUpload);

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
