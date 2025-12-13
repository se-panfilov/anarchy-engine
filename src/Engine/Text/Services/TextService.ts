import { merge } from 'rxjs';

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
  TTextAnyWrapper,
  TTextConfig,
  TTextFactory,
  TTextParams,
  TTextService
} from '@/Engine/Text/Models';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text/Renderers';
import { isText2dWrapper, isText3dWrapper } from '@/Engine/Text/Utils';

export function TextService(
  factory: TTextFactory,
  text2dRegistry: TText2dRegistry,
  text3dRegistry: TText3dRegistry,
  text2dRendererRegistry: TText2dRendererRegistry,
  text3dRendererRegistry: TText3dRendererRegistry,
  scene: TSceneWrapper
): TTextService {
  merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: TTextAnyWrapper) => scene.addText(text));
  factory.entityCreated$.subscribe((text: TTextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });

  const create = (params: TTextParams): TTextAnyWrapper => factory.create(params);
  const createFromConfig = (texts: ReadonlyArray<TTextConfig>): void => texts.forEach((text: TTextConfig): TTextAnyWrapper => factory.create(factory.configToParams(text)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe((): void => {
    factory.destroy();
    text2dRegistry.destroy();
    text3dRegistry.destroy();
    text2dRendererRegistry.destroy();
    text3dRendererRegistry.destroy();
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
    getRegistries: () => ({ text2dRegistry, text3dRegistry }),
    getRendererRegistries: () => ({ text2dRendererRegistry, text3dRendererRegistry }),
    ...destroyable
  };
}
