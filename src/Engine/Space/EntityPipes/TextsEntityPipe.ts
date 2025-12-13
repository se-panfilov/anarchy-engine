import type { Subscription } from 'rxjs';
import { merge } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { IText2dRegistry, IText2dRenderer, IText3dRegistry, IText3dRenderer, ITextAnyWrapper, ITextConfig, ITextFactory } from '@/Engine/Text';
import { initText2dRenderer, initText3dRenderer, isText2dWrapper, isText3dWrapper, Text2dRegistry, Text3dRegistry, TextFactory } from '@/Engine/Text';

export function initTextsEntityPipe(
  scene: ISceneWrapper,
  texts: ReadonlyArray<ITextConfig>
): {
  textAdded$: Subscription;
  textCreated$: Subscription;
  textFactory: ITextFactory;
  text2dRegistry: IText2dRegistry;
  text3dRegistry: IText3dRegistry;
  text2dRenderer: IText2dRenderer;
  text3dRenderer: IText3dRenderer;
} {
  const textFactory: ITextFactory = TextFactory();

  const text2dRenderer: IText2dRenderer = initText2dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);
  const text3dRenderer: IText3dRenderer = initText3dRenderer(ambientContext.container.getAppContainer(), ambientContext.screenSizeWatcher);

  const text2dRegistry: IText2dRegistry = Text2dRegistry();
  const text3dRegistry: IText3dRegistry = Text3dRegistry();

  const textAdded$: Subscription = merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
  const textCreated$: Subscription = textFactory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });
  texts.forEach((text: ITextConfig): ITextAnyWrapper => textFactory.create(textFactory.configToParams({ ...text, tags: [...text.tags, CommonTag.FromConfig] })));

  return { textAdded$, textCreated$, textFactory, text2dRegistry, text3dRegistry, text2dRenderer, text3dRenderer };
}
