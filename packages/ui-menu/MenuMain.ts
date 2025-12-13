import { createPinia } from 'pinia';
import { createApp } from 'vue';

import MenuApp from './MenuApp.vue';

const menuApp = createApp(MenuApp);

menuApp.use(createPinia());

menuApp.mount('#menu');
