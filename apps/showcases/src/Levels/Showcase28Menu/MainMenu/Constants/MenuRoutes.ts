import Audio from '@/Levels/Showcase28Menu/MainMenu/Views/Audio.vue';
import Graphics from '@/Levels/Showcase28Menu/MainMenu/Views/Graphics.vue';
import Home from '@/Levels/Showcase28Menu/MainMenu/Views/Home.vue';
import Localization from '@/Levels/Showcase28Menu/MainMenu/Views/Localization.vue';

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
