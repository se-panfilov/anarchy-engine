import type { TextTag } from '@/Engine/Domains/Text';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

export type ITextParams = Readonly<{
  text: string;
  position: IVector3Wrapper;
  fontSize: number;
  color: string;
}> &
  IWithReadonlyTags<TextTag>;
