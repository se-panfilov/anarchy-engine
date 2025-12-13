import { PCFShadowMap, WebGL1Renderer } from 'three';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import type { RendererParams, ScreenParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { IScreenSizeWatcher } from '@Engine/Watchers';
import type { IRendererWrapper } from './Models';

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper({ canvas }: RendererParams, screenSizeWatcher: IScreenSizeWatcher): IRendererWrapper {
  if (isNotDefined(canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const entity: WebGL1Renderer = new WebGL1Renderer({ canvas });
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.enabled = true;
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.type = PCFShadowMap;
  // eslint-disable-next-line functional/immutable-data
  entity.physicallyCorrectLights = true;

  screenSizeWatcher.value$.subscribe(({ width, height, ratio }: ScreenParams): void => {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  });

  screenSizeWatcher.destroy$.subscribe(() => {
    screenSizeWatcher.value$.unsubscribe();
    screenSizeWatcher.destroy$.unsubscribe();
  });

  const wrapper = AbstractWrapper(entity);
  wrapper.destroy$.subscribe((): void => {
    screenSizeWatcher.value$.unsubscribe();
    wrapper.destroy$.unsubscribe();
  });

  return { ...wrapper, entity };
}
