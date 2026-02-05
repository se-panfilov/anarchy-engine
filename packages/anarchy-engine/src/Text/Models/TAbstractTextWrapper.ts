import type { TWithObject3d, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TTextTranslationService } from '@hellpig/anarchy-engine/Text/Models';
import type { TWithTransformDrive } from '@hellpig/anarchy-engine/TransformDrive';

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
