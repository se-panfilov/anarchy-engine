import type { TAbstractWrapper } from '@Anarchy/Engine/Abstract';
import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import { withActiveMixin } from '@Anarchy/Engine/Mixins';
import { rendererToConfig } from '@Anarchy/Engine/Renderer/Adapters';
import { RendererModes } from '@Anarchy/Engine/Renderer/Constants';
import type { TRendererAccessors, TRendererConfig, TRendererParams, TRendererWrapper, TRendererWrapperDependencies } from '@Anarchy/Engine/Renderer/Models';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isNotDefined, isWebGL2Available, isWebGLAvailable } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import type { WebGLRendererParameters } from 'three';
import { PCFShadowMap, WebGLRenderer } from 'three';

import { getAccessors } from './Accessors';

export function RendererWrapper(params: TRendererParams, { container, renderLoop }: TRendererWrapperDependencies): TRendererWrapper {
  const isRendererReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
    depth: params.depth ?? true
  };

  if (isWebGL2) {
    const context: WebGL2RenderingContext | null = (options.canvas as HTMLCanvasElement).getContext(RendererModes.WebGL2, options) as WebGL2RenderingContext | null;
    if (isNotDefined(context)) throw new Error(`WebGL2 context is not defined, however mode is set to ${RendererModes.WebGL2}`);

    options = { ...options, context };
  }

  let entity: WebGLRenderer = new WebGLRenderer(options);
  const accessors: TRendererAccessors = getAccessors(entity);

  accessors.setShadowMapEnabled(params.isShadowMapEnabled ?? true);
  accessors.setShadowMapType(PCFShadowMap);

  //When "isRendererReady" is true, you can assume that the scene is loaded and ready.
  // if (isRendererReady$.value !== entity.info.render.frame > 0) isRendererReady$.next(entity.info.render.frame > 0);

  const rendererLoopSub$: Subscription = renderLoop.tick$.subscribe((): void => {
    const isRendererReady: boolean = entity.info.render.frame > 0;
    if (isRendererReady$.value === isRendererReady) return;
    isRendererReady$.next(isRendererReady);
  });

  function setValues(entity: TWriteable<WebGLRenderer>, { width, height }: DOMRect, ratio: number): void {
    if (isNotDefined(entity)) return;
    accessors.setSize(width, height);
    accessors.setPixelRatio(ratio, maxPixelRatio);
  }

  // TODO 9.2.0 ACTIVE: This could be done only in active$ renderer and applied in onActive hook
  const screenSizeSub$: Subscription = container.viewportRect$
    .pipe(distinctUntilChanged((prev: DOMRect, curr: DOMRect): boolean => prev?.width === curr?.width && prev?.height === curr?.height))
    .subscribe((rect: DOMRect): void => {
      if (isNotDefined(rect)) return;
      setValues(entity, rect, container.getRatio());
    });

  const wrapper: TAbstractWrapper<WebGLRenderer> = AbstractWrapper(entity, WrapperType.Renderer, params);

  const destroySub$: Subscription = wrapper.destroy$.subscribe((): void => {
    entity.dispose();
    entity.forceContextLoss();
    entity = null as any;

    destroySub$.unsubscribe();
    screenSizeSub$.unsubscribe();
    rendererLoopSub$.unsubscribe();
  });

  const result = mergeAll(wrapper, accessors, withActiveMixin(), {
    getParams: (): TRendererParams => params,
    serialize: (): TRendererConfig => rendererToConfig(result),
    isRendererReady$
  });

  result._setActive(params.isActive, true);

  return result;
}
