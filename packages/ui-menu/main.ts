import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';

const menuApp = createApp(App);

menuApp.use(createPinia());

menuApp.mount('#menu');
