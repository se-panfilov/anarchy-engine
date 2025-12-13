import { createPinia } from 'pinia';
import { createApp } from 'vue';

import MenuApp from './MenuApp.vue';

// TODO DESKTOP: Make sure lint, ts check and prettier are working with vue files
const menuApp = createApp(MenuApp);

menuApp.use(createPinia());

menuApp.mount('#menu');
