import { createPinia } from 'pinia';

//When call any store outside of a component, we need to pass the pinia instance explicitly (to avoid issues when multiple apps are running, e.g. menu + gui)
export const menuPinia = createPinia();
