import { PCFShadowMap, WebGL1Renderer } from 'three';
import { camera, sizes } from './camera';

const canvas: HTMLElement = document.querySelector('#app') as HTMLElement;

export const renderer = new WebGL1Renderer({ canvas });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.physicallyCorrectLights = true;

export function updateRenderer(): void {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  updateRenderer();

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});
