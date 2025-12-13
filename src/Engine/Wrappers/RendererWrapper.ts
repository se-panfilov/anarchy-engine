import { PCFShadowMap, WebGL1Renderer } from 'three';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

// TODO (S.Panfilov) DI deviceWatcher
export function RendererWrapper(canvas: HTMLElement): ReturnType<typeof AbstractWrapper<WebGL1Renderer>> {
  if (isNotDefined(canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const entity: WebGL1Renderer = new WebGL1Renderer({ canvas });
  entity.shadowMap.enabled = true;
  entity.shadowMap.type = PCFShadowMap;
  entity.physicallyCorrectLights = true;

  deviceWatcher.size$.subscribe(({ width, height, ratio }) => {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  });

  deviceWatcher.destroyed$.subscribe(() => deviceWatcher.size$.unsubscribe());

  destroyed$.subscribe(() => deviceWatcher.size$.unsubscribe());

  return { ...AbstractWrapper(entity), entity };
}
