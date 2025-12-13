import { PCFShadowMap, WebGL1Renderer } from 'three';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import { DeviceWatcher } from '@Engine/Watchers/DeviceWatcher';

export class RendererWrapper extends AbstractWrapper<WebGL1Renderer> {
  public entity: WebGL1Renderer;

  constructor(elementId: string, deviceWatcher: DeviceWatcher, canvas: HTMLElement) {
    super();

    // let canvas: HTMLElement | null = document.querySelector(elementId);
    if (isNotDefined(canvas)) throw new Error(`Cannot find element with selector "${elementId}"`);
    if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

    this.entity = new WebGL1Renderer({ canvas });
    this.entity.shadowMap.enabled = true;
    this.entity.shadowMap.type = PCFShadowMap;
    this.entity.physicallyCorrectLights = true;

    deviceWatcher.size$.subscribe(({ width, height, ratio }) => {
      if (isNotDefined(this.entity)) return;
      this.entity.setSize(width, height);
      this.entity.setPixelRatio(Math.min(ratio, 2));
    });

    deviceWatcher.destroyed$.subscribe(() => {
      deviceWatcher.size$.unsubscribe();
    });

    this.destroyed$.subscribe(() => {
      deviceWatcher.size$.unsubscribe();
    });
  }
}
