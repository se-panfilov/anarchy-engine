import Audio from 'packages/MainMenu/Views/Audio.vue';
import Graphics from 'packages/MainMenu/Views/Graphics.vue';
import Home from 'packages/MainMenu/Views/Home.vue';
import Localization from 'packages/MainMenu/Views/Localization.vue';

export enum MenuRoutes {
  Home = '/',
  Audio = '/audio',
  Graphics = '/graphics',
  Localization = '/localization'
}

// TODO DESKTOP: any?
export const menuRouteMap: Record<MenuRoutes, any> = {
  [MenuRoutes.Home]: Home,
  [MenuRoutes.Audio]: Audio,
  [MenuRoutes.Graphics]: Graphics,
  [MenuRoutes.Localization]: Localization
};
