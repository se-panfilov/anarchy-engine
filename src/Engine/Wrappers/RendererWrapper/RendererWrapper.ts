import { PCFShadowMap, WebGL1Renderer } from 'three';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import type { IRendererParams, IScreenParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { IScreenSizeWatcher } from '@Engine/Watchers';
import type { IRendererWrapper } from './Models';
import { IWrapper } from '@Engine/Models';

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper({ canvas }: IRendererParams, screenSizeWatcher: IScreenSizeWatcher): IRendererWrapper {
  if (isNotDefined(canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const entity: WebGL1Renderer = new WebGL1Renderer({ canvas });
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.enabled = true;
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.type = PCFShadowMap;
  // eslint-disable-next-line functional/immutable-data
  entity.physicallyCorrectLights = true;

  screenSizeWatcher.value$.subscribe(({ width, height, ratio }: IScreenParams): void => {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  });

  screenSizeWatcher.destroy$.subscribe(() => {
    screenSizeWatcher.value$.unsubscribe();
    screenSizeWatcher.destroy$.unsubscribe();
  });

  const wrapper: IWrapper<WebGL1Renderer> = AbstractWrapper(entity);

  function destroy(): void {
    screenSizeWatcher.value$.unsubscribe();
  }

  return { ...wrapper, entity, destroy };
}
