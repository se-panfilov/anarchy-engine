import type { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, EMPTY, switchMap } from 'rxjs';
import type { WebGLRendererParameters } from 'three';
import { PCFShadowMap, WebGLRenderer } from 'three';

import type { TWrapper } from '@/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { withActiveMixin } from '@/Engine/Mixins';
import { RendererModes } from '@/Engine/Renderer/Constants';
import type { TRendererAccessors, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@/Engine/Renderer/Models';
import type { TScreenSizeValues, TScreenSizeWatcher } from '@/Engine/Screen';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined, isWebGL2Available, isWebGLAvailable } from '@/Engine/Utils';

import { getAccessors } from './Accessors';

export function RendererWrapper(params: TRendererParams, { screenService }: TRendererWrapperDependencies): TRendererWrapper {
  const maxPixelRatio: number = params.maxPixelRatio ?? 2;
  if (isNotDefined(params.canvas)) throw new Error(`Canvas is not defined`);
  if (!isWebGLAvailable()) throw new Error('WebGL is not supported by this device');
  const isWebGL2: boolean = params.mode === RendererModes.WebGL2;
  if (isWebGL2 && !isWebGL2Available()) throw new Error('WebGL2 is not supported by this device');

  let options: WebGLRendererParameters = {
    canvas: params.canvas,
    alpha: params.alpha ?? false, //until we have a reason to use it (off for a better performance)
    antialias: params.antialias ?? true,
    stencil: params.stencil ?? false, //until we have a reason to use it (off for a better performance)
    depth: params.depth ?? false //until we have a reason to use it (off for a better performance)
  };

  if (isWebGL2) {
    const context: WebGL2RenderingContext | null = (options.canvas as HTMLCanvasElement).getContext(RendererModes.WebGL2);
    if (isNotDefined(context)) throw new Error(`WebGL2 context is not defined, however mode is set to ${RendererModes.WebGL2}`);

    // TODO 14-0-0: what's the different here? WHy screen white/black?
    // options = Object.assign(options, context);
    options = { ...options, context };
  }

  let entity: WebGLRenderer = new WebGLRenderer(options);
  const accessors: TRendererAccessors = getAccessors(entity);

  accessors.setShadowMapEnabled(params.isShadowMapEnabled ?? true);
  accessors.setShadowMapType(PCFShadowMap);

  function setValues(entity: TWriteable<WebGLRenderer>, { width, height, ratio }: TScreenSizeValues): void {
    if (isNotDefined(entity)) return;
    accessors.setSize(width, height);
    accessors.setPixelRatio(ratio, maxPixelRatio);
  }

  // TODO 9.2.0 ACTIVE: This could be done only in active$ renderer and applied in onActive hook
  const screenSizeSub$: Subscription = screenService.watchers.default$
    .pipe(
      switchMap((screenSizeWatcher: TScreenSizeWatcher | undefined): Observable<TScreenSizeValues> => (isDefined(screenSizeWatcher) ? screenSizeWatcher.value$ : EMPTY)),
      distinctUntilChanged((prev: TScreenSizeValues, curr: TScreenSizeValues): boolean => prev.width === curr.width && prev.height === curr.height)
    )
    .subscribe((params: TScreenSizeValues): void => {
      setValues(entity, { ...params, ...getWidthAndHeight(options.canvas as HTMLCanvasElement, params) });
    });

  const screenSizeWatcherSubscription: Subscription = screenService.watchers.default$
    .pipe(switchMap((screenSizeWatcher: TScreenSizeWatcher | undefined): Observable<void> => (isDefined(screenSizeWatcher) ? screenSizeWatcher.destroy$ : EMPTY)))
    .subscribe((): void => {
      screenSizeSub$.unsubscribe();
      screenSizeWatcherSubscription.unsubscribe();
    });

  const wrapper: TWrapper<WebGLRenderer> = AbstractWrapper(entity, WrapperType.Renderer, params);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    entity.dispose();
    entity.forceContextLoss();
    entity = null as any;

    destroySub$.unsubscribe();
    screenSizeSub$.unsubscribe();
    screenSizeWatcherSubscription.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(wrapper, accessors, withActiveMixin(), entity);

  result._setActive(params.isActive, true);

  return result;
}

function getWidthAndHeight(canvas: HTMLCanvasElement, params: TScreenSizeValues): Pick<TScreenSizeValues, 'width' | 'height'> {
  const width: number = canvas.parentElement?.clientWidth ? canvas.parentElement?.clientWidth : params.width;
  const height: number = canvas.parentElement?.clientHeight ? canvas.parentElement?.clientHeight : params.height;

  return { width, height };
}
