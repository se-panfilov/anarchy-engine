import { merge } from 'rxjs';

import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import type {
  IText2dRegistry,
  IText2dRenderer,
  IText2dRendererRegistry,
  IText3dRegistry,
  IText3dRenderer,
  IText3dRendererRegistry,
  ITextConfig,
  ITextFactory,
  ITextParams,
  ITextService,
  TTextAnyWrapper
} from '@/Engine/Text/Models';
import { initText2dRenderer, initText3dRenderer } from '@/Engine/Text/Renderers';
import { isText2dWrapper, isText3dWrapper } from '@/Engine/Text/Utils';

export function TextService(
  factory: ITextFactory,
  text2dRegistry: IText2dRegistry,
  text3dRegistry: IText3dRegistry,
  text2dRendererRegistry: IText2dRendererRegistry,
  text3dRendererRegistry: IText3dRendererRegistry,
  scene: TSceneWrapper
): ITextService {
  merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: TTextAnyWrapper) => scene.addText(text));
  factory.entityCreated$.subscribe((text: TTextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });

  const create = (params: ITextParams): TTextAnyWrapper => factory.create(params);
  const createFromConfig = (texts: ReadonlyArray<ITextConfig>): void => texts.forEach((text: ITextConfig): TTextAnyWrapper => factory.create(factory.configToParams(text)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe((): void => {
    factory.destroy();
    text2dRegistry.destroy();
    text3dRegistry.destroy();
    text2dRendererRegistry.destroy();
    text3dRendererRegistry.destroy();
  });

  function createText2dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): IText2dRenderer {
    const renderer: IText2dRenderer = initText2dRenderer(container, screenSizeWatcher);
    text2dRendererRegistry.add(renderer.id, renderer);
    return renderer;
  }

  function createText3dRenderer(container: TAppGlobalContainer, screenSizeWatcher: Readonly<TScreenSizeWatcher>): IText3dRenderer {
    const renderer: IText3dRenderer = initText3dRenderer(container, screenSizeWatcher);
    text3dRendererRegistry.add(renderer.id, renderer);
    return renderer;
  }

  return {
    create,
    createFromConfig,
    getFactory: (): ITextFactory => factory,
    getScene: (): TSceneWrapper => scene,
    createText2dRenderer,
    createText3dRenderer,
    getRegistries: () => ({ text2dRegistry, text3dRegistry }),
    getRendererRegistries: () => ({ text2dRendererRegistry, text3dRendererRegistry }),
    ...destroyable
  };
}
