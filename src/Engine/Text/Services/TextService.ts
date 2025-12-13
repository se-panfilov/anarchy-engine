import type { Subscription } from 'rxjs';
import { BehaviorSubject, merge } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDisposable } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import type { TSpaceLoops } from '@/Engine/Space';
import { textLoopEffect } from '@/Engine/Text/Loop';
import type {
  TText2dRegistry,
  TText2dRenderer,
  TText2dRendererRegistry,
  TText3dRegistry,
  TText3dRenderer,
  TText3dRendererRegistry,
  TText3dTextureRegistry,
  TTextAnyWrapper,
  TTextConfig,
  TTextDependencies,
  TTextFactory,
  TTextParams,
  TTextService
} from '@/Engine/Text/Models';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text/Renderers';
import { isText2dWrapper, isText3dTextureWrapper, isText3dWrapper } from '@/Engine/Text/Utils';

export function TextService(
  factory: TTextFactory,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text3dTextureRegistry: TText3dTextureRegistry,
  text2dRendererRegistry: TText2dRendererRegistry,
  text3dRendererRegistry: TText3dRendererRegistry,
  { textLoop }: TSpaceLoops,
  dependencies: TTextDependencies,
  scene: TSceneWrapper
): TTextService {
  merge(text2dRegistry.added$, text3dRegistry.added$, text3dTextureRegistry.added$).subscribe(({ value }: TRegistryPack<TTextAnyWrapper>) => scene.addText(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((text: TTextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    else if (isText3dWrapper(text)) text3dRegistry.add(text);
    else if (isText3dTextureWrapper(text)) text3dTextureRegistry.add(text);
    else throw new Error(`TextService. EntityCreated: Unknown text type "${(text as any).type ? (text as any).type : ''}"`);
  });

  const disposable: ReadonlyArray<TDisposable> = [text2dRegistry, text3dRegistry, text3dTextureRegistry, text2dRendererRegistry, text3dRendererRegistry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = (params: TTextParams): TTextAnyWrapper => factory.create(params, dependencies);
  const createFromConfig = (texts: ReadonlyArray<TTextConfig>): ReadonlyArray<TTextAnyWrapper> => texts.map((text: TTextConfig): TTextAnyWrapper => create(factory.configToParams(text)));

  const activeText2dRenderer: BehaviorSubject<TText2dRenderer | undefined> = new BehaviorSubject<TText2dRenderer | undefined>(undefined);

  function createText2dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText2dRenderer {
    const renderer: TText2dRenderer = initText2dRenderer(container, screenSizeWatcher);
    text2dRendererRegistry.add(renderer.id, renderer);
    if (text2dRendererRegistry.getLength() === 1) activeText2dRenderer.next(renderer);
    return renderer;
  }

  const activeText3dRenderer: BehaviorSubject<TText3dRenderer | undefined> = new BehaviorSubject<TText3dRenderer | undefined>(undefined);

  function createText3dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText3dRenderer {
    const renderer: TText3dRenderer = initText3dRenderer(container, screenSizeWatcher);
    text3dRendererRegistry.add(renderer.id, renderer);
    if (text3dRendererRegistry.getLength() === 1) activeText3dRenderer.next(renderer);
    return renderer;
  }

  const loopSub$: Subscription = textLoopEffect(textLoop, text2dRegistry, text3dRegistry, activeText2dRenderer, activeText3dRenderer, scene, dependencies.cameraService);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    getFactory: (): TTextFactory => factory,
    getScene: (): TSceneWrapper => scene,
    createText2dRenderer,
    createText3dRenderer,
    getRegistries: () => ({ text2dRegistry, text3dRegistry, text3dTextureRegistry }),
    getRendererRegistries: () => ({ text2dRendererRegistry, text3dRendererRegistry }),
    activeText2dRenderer: activeText2dRenderer.asObservable(),
    activeText3dRenderer: activeText3dRenderer.asObservable(),
    getActiveText2dRenderer: (): TText2dRenderer | undefined => activeText2dRenderer.value,
    getActiveText3dRenderer: (): TText3dRenderer | undefined => activeText3dRenderer.value
  });
}
