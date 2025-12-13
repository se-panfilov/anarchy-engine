import type { IWrapper } from '@Engine/Domains/Abstract';
import { AbstractWrapper, WrapperType } from '@Engine/Domains/Abstract';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@Engine/Domains/Screen';
import type { IWriteable } from '@Engine/Utils';
import { isNotDefined, isWebGL2Available, isWebGLAvailable } from '@Engine/Utils';
import type { Subscription } from 'rxjs';
import type { WebGLRendererParameters } from 'three';
import { PCFShadowMap, WebGLRenderer } from 'three';

import { RendererModes } from '../Constants';
import type { IRendererParams, IRendererWrapper } from '../Models';

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper(params: IRendererParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IRendererWrapper {
  if (isNotDefined(params.canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');
  const isWebGL2: boolean = params.mode === RendererModes.WebGL2;
  if (isWebGL2 && !isWebGL2Available()) throw new Error('WebGL2 is not supported by this device');

  let options: WebGLRendererParameters = {
    canvas: params.canvas,
    alpha: true,
    antialias: true,
    stencil: true
  };

  if (isWebGL2) {
    const context: WebGL2RenderingContext | null = (options.canvas as HTMLCanvasElement).getContext(RendererModes.WebGL2);
    if (isNotDefined(context)) throw new Error(`WebGL2 context is not defined, however mode is set to ${RendererModes.WebGL2}`);
    options = { ...options, context };
  }

  const entity: WebGLRenderer = new WebGLRenderer(options);
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.enabled = true;
  // eslint-disable-next-line functional/immutable-data
  entity.shadowMap.type = PCFShadowMap;

  // eslint-disable-next-line functional/prefer-immutable-types
  function setValues(entity: IWriteable<WebGLRenderer>, { width, height, ratio }: IScreenSizeValues): void {
    if (isNotDefined(entity)) return;
    entity.setSize(width, height);
    entity.setPixelRatio(Math.min(ratio, 2));
  }

  //init with the values which came before the start of the subscription
  setValues(entity, screenSizeWatcher.latest$.value);

  screenSizeWatcher.value$.subscribe((params: IScreenSizeValues): void => setValues(entity, params));

  const screenSizeWatcherSubscription: Subscription = screenSizeWatcher.destroyed$.subscribe(() => {
    screenSizeWatcher.value$.unsubscribe();
    screenSizeWatcherSubscription.unsubscribe();
  });

  const wrapper: IWrapper<WebGLRenderer> = AbstractWrapper(entity, WrapperType.Renderer, params);

  function destroy(): void {
    screenSizeWatcher.value$.unsubscribe();
  }

  return { ...wrapper, entity, destroy };
}
