import { PCFShadowMap, WebGL1Renderer } from 'three';
import { deviceSize$ } from './Store/DeviceSize';

// TODO (S.Panfilov) global?
const canvas: HTMLElement = document.querySelector('#app') as HTMLElement;
export const renderer = new WebGL1Renderer({ canvas });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.physicallyCorrectLights = true;

deviceSize$.subscribe(({ width, height, devicePixelRatio }) => {
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
});
