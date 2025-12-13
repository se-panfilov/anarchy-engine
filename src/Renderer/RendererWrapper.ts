import { PCFShadowMap, WebGL1Renderer } from 'three';
import { deviceSize$ } from '../Store/DeviceSize';
import { isNotDefined, isWebGLAvailable } from '../Utils';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import { WrappedRenderer } from './Models/WrappedRenderer';

export function RendererWrapper(elementId: string): WrappedRenderer {
  // TODO (S.Panfilov) global?
  let canvas: HTMLElement | null = document.querySelector(elementId);
  if (isNotDefined(canvas)) throw new Error(`Cannot find element with selector "${elementId}"`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const destroyed$ = new Subject<void>();

  let renderer: WebGL1Renderer = new WebGL1Renderer({ canvas });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.physicallyCorrectLights = true;

  deviceSize$.subscribe(({ width, height, devicePixelRatio }) => {
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  });

  function destroy(): void {
    renderer = null as any;
    canvas = null as any;
    deviceSize$.unsubscribe();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `renderer_wrapper_${nanoid()}`, renderer, destroy, destroyed$ };
}
