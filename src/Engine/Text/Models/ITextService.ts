import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

import type { IText2dRegistry } from './IText2dRegistry';
import type { IText3dRegistry } from './IText3dRegistry';
import type { ITextAnyWrapper } from './ITextAnyWrapper';
import type { ITextConfig } from './ITextConfig';
import type { ITextFactory } from './ITextFactory';
import type { ITextParams } from './ITextParams';

export type ITextService = Readonly<{
  create: (params: ITextParams) => ITextAnyWrapper;
  createFromConfig: (texts: ReadonlyArray<ITextConfig>) => void;
  getFactory: () => ITextFactory;
  getScene: () => ISceneWrapper;
  getRegistries: () => { text2dRegistry: IText2dRegistry; text3dRegistry: IText3dRegistry };
}> &
  IDestroyable;
