import { PCFShadowMap, WebGL1Renderer } from 'three';
import { deviceSize$ } from '@Engine/Store/DeviceSize';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

export class RendererWrapper extends AbstractWrapper<WebGL1Renderer> {
  public entity: WebGL1Renderer;

  constructor(elementId: string, deviceSizeManager: DeviceSizeManager, canvas: HTMLElement) {
    super();

    // let canvas: HTMLElement | null = document.querySelector(elementId);
    if (isNotDefined(canvas)) throw new Error(`Cannot find element with selector "${elementId}"`);
    if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

    this.entity = new WebGL1Renderer({ canvas });
    this.entity.shadowMap.enabled = true;
    this.entity.shadowMap.type = PCFShadowMap;
    this.entity.physicallyCorrectLights = true;

    deviceSizeManager.deviceSize$.subscribe(({ width, height, devicePixelRatio }) => {
      if (isNotDefined(this.entity)) return;
      this.entity.setSize(width, height);
      this.entity.setPixelRatio(Math.min(devicePixelRatio, 2));
    });

    deviceSizeManager.destroyed$.subscribe(() => {
      deviceSizeManager.deviceSize$.unsubscribe();
    });

    this.destroyed$.subscribe(() => {
      canvas = null as any;
      deviceSize$.unsubscribe();
    });
  }
}
