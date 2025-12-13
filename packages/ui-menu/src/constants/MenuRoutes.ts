import Audio from '@Menu/views/Audio.vue';
import Graphics from '@Menu/views/Graphics.vue';
import Home from '@Menu/views/Home.vue';
import Localization from '@Menu/views/Localization.vue';

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
