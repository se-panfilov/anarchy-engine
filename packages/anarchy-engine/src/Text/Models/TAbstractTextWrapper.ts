import type { TWithObject3d, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TTextTranslationService } from '@Anarchy/Engine/Text/Models';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

import type { TTextTransformAgents } from './TTextTransformAgents';

export type TAbstractTextWrapper = Readonly<{
  getElement: () => HTMLElement;
  setTranslationService: (translationService: TTextTranslationService) => void;
  setTextKey: (textKey: string) => void;
  getTextKey: () => string | undefined;
}> &
  TWithTransformDrive<TTextTransformAgents> &
  TWithObject3d &
  TWithTags;
