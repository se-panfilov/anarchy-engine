import Audio from '@Showcases/Menu/views/Audio.vue';
import Graphics from '@Showcases/Menu/views/Graphics.vue';
import Home from '@Showcases/Menu/views/Home.vue';
import Legal from '@Showcases/Menu/views/Legal.vue';
import Localization from '@Showcases/Menu/views/Localization.vue';
import Settings from '@Showcases/Menu/views/Settings.vue';

export enum Routes {
  Home = '/',
  Audio = '/audio',
  Graphics = '/graphics',
  Legal = '/legal',
  Localization = '/localization',
  Settings = '/settings'
}

export const menuRouteMap: Record<Routes, any> = {
  [Routes.Home]: Home,
  [Routes.Audio]: Audio,
  [Routes.Graphics]: Graphics,
  [Routes.Localization]: Localization,
  [Routes.Legal]: Legal,
  [Routes.Settings]: Settings
};
