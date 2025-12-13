import { merge, Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
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
  scene: TSceneWrapper
): TTextService {
  merge(text2dRegistry.added$, text3dRegistry.added$, text3dTextureRegistry.added$).subscribe(({ value }: TRegistryPack<TTextAnyWrapper>) => scene.addText(value));
  const factorySub$: Subscription = factory.entityCreated$.subscribe((text: TTextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    else if (isText3dWrapper(text)) text3dRegistry.add(text);
    else if (isText3dTextureWrapper(text)) text3dTextureRegistry.add(text);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    else throw new Error(`TextService. EntityCreated: Unknown text type "${(text as any).type ? (text as any).type : ''}"`);
  });

  const create = (params: TTextParams): TTextAnyWrapper => factory.create(params);
  const createFromConfig = (texts: ReadonlyArray<TTextConfig>): ReadonlyArray<TTextAnyWrapper> => texts.map((text: TTextConfig): TTextAnyWrapper => create(factory.configToParams(text)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    factorySub$.unsubscribe();

    factory.destroy$.next();
    text2dRegistry.destroy$.next();
    text3dRegistry.destroy$.next();
    text3dTextureRegistry.destroy$.next();
    text2dRendererRegistry.destroy$.next();
    text3dRendererRegistry.destroy$.next();
  });

  function createText2dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText2dRenderer {
    const renderer: TText2dRenderer = initText2dRenderer(container, screenSizeWatcher);
    text2dRendererRegistry.add(renderer.id, renderer);
    return renderer;
  }

  function createText3dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): TText3dRenderer {
    const renderer: TText3dRenderer = initText3dRenderer(container, screenSizeWatcher);
    text3dRendererRegistry.add(renderer.id, renderer);
    return renderer;
  }

  return {
    create,
    createFromConfig,
    getFactory: (): TTextFactory => factory,
    getScene: (): TSceneWrapper => scene,
    createText2dRenderer,
    createText3dRenderer,
    getRegistries: () => ({ text2dRegistry, text3dRegistry, text3dTextureRegistry }),
    getRendererRegistries: () => ({ text2dRendererRegistry, text3dRendererRegistry }),
    ...destroyable
  };
}
