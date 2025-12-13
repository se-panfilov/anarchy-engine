import type { IWrapper } from '@Engine/Domains/Abstract';
import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer';
import type { IScreenParams, IScreenSizeWatcher } from '@Engine/Domains/Screen';
import type { IWriteable } from '@Engine/Utils';
import { isNotDefined, isWebGLAvailable } from '@Engine/Utils';
import { PCFShadowMap, WebGLRenderer } from 'three';

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper(params: IRendererParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IRendererWrapper {
  if (isNotDefined(params.canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');

  const entity: WebGLRenderer = new WebGLRenderer({ canvas: params.canvas });
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.enabled = true;
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.type = PCFShadowMap;
  // eslint-disable-next-line functional/immutable-data
  entity.useLegacyLights = false;

  // eslint-disable-next-line functional/prefer-immutable-types
  function setValues(entity: IWriteable<WebGLRenderer>, { width, height, ratio }: IScreenParams): void {
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

  const wrapper: IWrapper<WebGLRenderer> = AbstractWrapper(entity, params);

  function destroy(): void {
    screenSizeWatcher.value$.unsubscribe();
  }

  return { ...wrapper, entity, destroy };
}
