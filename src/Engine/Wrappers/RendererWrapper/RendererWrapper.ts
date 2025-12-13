import type { IRendererParams, IScreenParams } from '@Engine/Models';
import { IWrapper } from '@Engine/Models';
import { isNotDefined, isWebGLAvailable, Writeable } from '@Engine/Utils';
import type { IScreenSizeWatcher } from '@Engine/Watchers';
import { AbstractWrapper } from '@Engine/Wrappers';
import { PCFShadowMap, WebGL1Renderer } from 'three';

import type { IRendererWrapper } from './Models';

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

  // eslint-disable-next-line functional/prefer-immutable-types
  function setValues(entity: Writeable<WebGL1Renderer>, { width, height, ratio }: IScreenParams): void {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  }

  //init with the values which came before the start of the subscription
  setValues(entity, screenSizeWatcher.latest$.value);

  screenSizeWatcher.value$.subscribe((params: IScreenParams): void => setValues(entity, params));

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
