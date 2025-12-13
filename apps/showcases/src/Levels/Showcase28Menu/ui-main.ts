import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './ui-App.vue';

const app = createApp(App);

app.use(createPinia());

app.mount('#gui');
