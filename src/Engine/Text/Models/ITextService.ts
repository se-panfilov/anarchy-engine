import type { IDestroyable } from '@/Engine/Mixins';

import type { ITextAnyWrapper } from './ITextAnyWrapper';
import type { ITextConfig } from './ITextConfig';
import type { ITextParams } from './ITextParams';

export type ITextService = Readonly<{
  create: (params: ITextParams) => ITextAnyWrapper;
  createFromConfig: (texts: ReadonlyArray<ITextConfig>) => void;
}> &
  IDestroyable;
