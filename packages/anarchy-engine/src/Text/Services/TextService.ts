import type { TAbstractService, TRegistryPack } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import { ambientContext } from '@Anarchy/Engine/Context';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withSceneGetterService } from '@Anarchy/Engine/Mixins';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import { textLoopEffect } from '@Anarchy/Engine/Text/Loop';
import type {
  TText2dRegistry,
  TText2dRenderer,
  TText2dRendererRegistry,
  TText2dWrapper,
  TText3dRegistry,
  TText3dRenderer,
  TText3dRendererRegistry,
  TText3dTextureRegistry,
  TText3dTextureWrapper,
  TText3dWrapper,
  TTextAnyWrapper,
  TTextConfig,
  TTextFactory,
  TTextService,
  TTextServiceDependencies,
  TTextServiceWithCreate,
  TTextServiceWithCreateFromConfig,
  TTextServiceWithFactory,
  TTextTranslationService
} from '@Anarchy/Engine/Text/Models';
import { initText2dRenderer, initText3dRenderer } from '@Anarchy/Engine/Text/Renderers';
import styles from '@Anarchy/Engine/Text/Styles/font-elements.css?inline';
import { isText2dWrapper, isText3dTextureWrapper, isText3dWrapper } from '@Anarchy/Engine/Text/Utils';
import { injectStyle, mergeAll } from '@Anarchy/Engine/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, merge } from 'rxjs';

export function TextService(
  factory: TTextFactory,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text3dTextureRegistry: TText3dTextureRegistry,
  text2dRendererRegistry: TText2dRendererRegistry,
  text3dRendererRegistry: TText3dRendererRegistry,
  { textLoop }: TSpaceLoops,
  dependencies: TTextServiceDependencies,
  scene: TSceneWrapper
): TTextService {
  merge(text2dRegistry.added$, text3dRegistry.added$, text3dTextureRegistry.added$).subscribe(({ value }: TRegistryPack<TTextAnyWrapper>): void => scene.addText(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((text: TTextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    else if (isText3dWrapper(text)) text3dRegistry.add(text);
    else if (isText3dTextureWrapper(text)) text3dTextureRegistry.add(text);
    else throw new Error(`TextService. EntityCreated: Unknown text type "${(text as any).type ? (text as any).type : ''}"`);
  });

  const disposable: ReadonlyArray<TDisposable> = [text2dRegistry, text3dRegistry, text3dTextureRegistry, text2dRendererRegistry, text3dRendererRegistry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TTextServiceWithCreate = withCreateServiceMixin(factory, dependencies);
  const withCreateFromConfigService: TTextServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, dependencies);
  const withFactory: TTextServiceWithFactory = withFactoryService(factory);

  const activeText2dRenderer: BehaviorSubject<TText2dRenderer | undefined> = new BehaviorSubject<TText2dRenderer | undefined>(undefined);

  function createText2dRenderer(container: TContainerDecorator): TText2dRenderer {
    const renderer: TText2dRenderer = initText2dRenderer(container);
    text2dRendererRegistry.add(renderer.id, renderer);
    if (text2dRendererRegistry.getLength() === 1) activeText2dRenderer.next(renderer);
    return renderer;
  }

  const activeText3dRenderer: BehaviorSubject<TText3dRenderer | undefined> = new BehaviorSubject<TText3dRenderer | undefined>(undefined);

  function createText3dRenderer(container: TContainerDecorator): TText3dRenderer {
    const renderer: TText3dRenderer = initText3dRenderer(container);
    text3dRendererRegistry.add(renderer.id, renderer);
    if (text3dRendererRegistry.getLength() === 1) activeText3dRenderer.next(renderer);
    return renderer;
  }

  function setTextTranslationService(textTranslationService: TTextTranslationService): void {
    text2dRegistry.forEach((wrapper: TText2dWrapper): void => wrapper.setTranslationService(textTranslationService));
    text3dRegistry.forEach((wrapper: TText3dWrapper): void => wrapper.setTranslationService(textTranslationService));
    text3dTextureRegistry.forEach((wrapper: TText3dTextureWrapper): void => wrapper.setTranslationService(textTranslationService));
  }

  const loopSub$: Subscription = textLoopEffect(textLoop, text2dRegistry, text3dRegistry, activeText2dRenderer, activeText3dRenderer, scene, dependencies.cameraService);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    loopSub$.unsubscribe();
  });

  return mergeAll(abstractService, withCreateService, withCreateFromConfigService, withFactory, withSceneGetterService(scene), {
    injectStyle: (): void => injectStyle(ambientContext, styles, 'anarchy-engine-text-styles'),
    createText2dRenderer,
    createText3dRenderer,
    setTextTranslationService,
    getRegistries: () => ({ text2dRegistry, text3dRegistry, text3dTextureRegistry }),
    getRendererRegistries: () => ({ text2dRendererRegistry, text3dRendererRegistry }),
    activeText2dRenderer: activeText2dRenderer.asObservable(),
    activeText3dRenderer: activeText3dRenderer.asObservable(),
    getActiveText2dRenderer: (): TText2dRenderer | undefined => activeText2dRenderer.value,
    getActiveText3dRenderer: (): TText3dRenderer | undefined => activeText3dRenderer.value,
    serializeAllEntities: (): ReadonlyArray<TTextConfig> => {
      return [
        ...(text2dRegistry.serialize() as ReadonlyArray<TTextConfig>),
        ...(text3dRegistry.serialize() as ReadonlyArray<TTextConfig>),
        ...(text3dTextureRegistry.serialize() as ReadonlyArray<TTextConfig>)
      ];
    },
    serializeEntity: (entity: TTextAnyWrapper): TTextConfig => entity.serialize()
  });
}
