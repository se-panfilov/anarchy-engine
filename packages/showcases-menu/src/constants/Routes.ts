import Audio from '@Showcases/Menu/views/Audio.vue';
import Graphics from '@Showcases/Menu/views/Graphics.vue';
import Home from '@Showcases/Menu/views/Home.vue';
import Localization from '@Showcases/Menu/views/Localization.vue';
import Settings from '@Showcases/Menu/views/Settings.vue';

export enum Routes {
  Home = '/',
  Audio = '/audio',
  Graphics = '/graphics',
  Localization = '/localization',
  Settings = '/settings'
}

// TODO DESKTOP: any?
export const menuRouteMap: Record<Routes, any> = {
  [Routes.Home]: Home,
  [Routes.Audio]: Audio,
  [Routes.Graphics]: Graphics,
  [Routes.Localization]: Localization,
  [Routes.Settings]: Settings
};
