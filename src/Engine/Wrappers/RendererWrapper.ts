import { PCFShadowMap, WebGL1Renderer } from 'three';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { RendererParams } from '@Engine/Models';
import { DeviceWatcher } from '@Engine/Watchers';

export type IRendererWrapper = ReturnType<typeof AbstractWrapper<WebGL1Renderer>>;

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper({ canvas }: RendererParams): IRendererWrapper {
  if (isNotDefined(canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const entity: WebGL1Renderer = new WebGL1Renderer({ canvas });
  entity.shadowMap.enabled = true;
  entity.shadowMap.type = PCFShadowMap;
  entity.physicallyCorrectLights = true;

  // TODO (S.Panfilov) DI deviceWatcher instead of a creation of a new entity
  const deviceWatcher: ReturnType<typeof DeviceWatcher> = DeviceWatcher();

  deviceWatcher.value$.subscribe(({ width, height, ratio }) => {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  });

  deviceWatcher.destroy$.subscribe(() => deviceWatcher.value$.unsubscribe());

  const wrapper = AbstractWrapper(entity);
  wrapper.destroy$.subscribe(() => {
    deviceWatcher.value$.unsubscribe();
    wrapper.destroy$.unsubscribe();
  });

  return { ...wrapper, entity };
}
