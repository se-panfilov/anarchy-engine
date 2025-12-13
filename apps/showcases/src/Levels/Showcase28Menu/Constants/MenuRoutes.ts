import { HomeView, SomeView } from '@/Levels/Showcase28Menu/Views';

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
