import { merge } from 'rxjs';

import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { IText2dRegistry, IText3dRegistry, ITextAnyWrapper, ITextConfig, ITextFactory, ITextParams, ITextService } from '@/Engine/Text/Models';
import { isText2dWrapper, isText3dWrapper } from '@/Engine/Text/Utils';

export function TextService(factory: ITextFactory, text2dRegistry: IText2dRegistry, text3dRegistry: IText3dRegistry, scene: ISceneWrapper): ITextService {
  merge(text2dRegistry.added$, text3dRegistry.added$).subscribe((text: ITextAnyWrapper) => scene.addText(text));
  factory.entityCreated$.subscribe((text: ITextAnyWrapper): void => {
    if (isText2dWrapper(text)) text2dRegistry.add(text);
    if (isText3dWrapper(text)) text3dRegistry.add(text);
  });

  const create = (params: ITextParams): ITextAnyWrapper => factory.create(params);
  const createFromConfig = (texts: ReadonlyArray<ITextConfig>): void => texts.forEach((text: ITextConfig): ITextAnyWrapper => factory.create(factory.configToParams(text)));

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    text2dRegistry.destroy();
    text3dRegistry.destroy();
  });

  return {
    create,
    createFromConfig,
    ...destroyable
  };
}
