import HomeView from '@/Levels/Showcase28Menu/MainMenu/Views/HomeView.vue';
import SomeView from '@/Levels/Showcase28Menu/MainMenu/Views/SomeView.vue';

export enum MenuRoutes {
  Home = '/',
  Some = '/some'
}

// TODO DESKTOP: any?
// TODO DESKTOP: can we do it lazy?
export const menuRouteMap: Record<MenuRoutes, any> = {
  [MenuRoutes.Home]: HomeView,
  [MenuRoutes.Some]: SomeView
};
