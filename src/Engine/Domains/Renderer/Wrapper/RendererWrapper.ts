import type { Subscription } from 'rxjs';
import type { WebGLRendererParameters } from 'three';
import { PCFShadowMap, WebGLRenderer } from 'three';

import type { IWrapper } from '@/Engine/Domains/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { RendererModes } from '@/Engine/Domains/Renderer/Constants';
import type { IRendererParams, IRendererWrapper } from '@/Engine/Domains/Renderer/Models';
import type { IScreenSizeValues, IScreenSizeWatcher } from '@/Engine/Domains/Screen';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined, isWebGL2Available, isWebGLAvailable } from '@/Engine/Utils';

// TODO (S.Panfilov) Should we provide delta here?
export function RendererWrapper(params: IRendererParams, screenSizeWatcher: Readonly<IScreenSizeWatcher>): IRendererWrapper {
  const maxPixelRatio: number = params.maxPixelRatio ?? 2;
  if (isNotDefined(params.canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');
  const isWebGL2: boolean = params.mode === RendererModes.WebGL2;
  if (isWebGL2 && !isWebGL2Available()) throw new Error('WebGL2 is not supported by this device');

  let options: WebGLRendererParameters = {
    canvas: params.canvas,
    alpha: false, //until we have a reason to use it (off for a better performance)
    antialias: true,
    stencil: false, //until we have a reason to use it (off for a better performance)
    depth: false //until we have a reason to use it (off for a better performance)
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
    entity.setPixelRatio(Math.min(ratio, maxPixelRatio));
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
