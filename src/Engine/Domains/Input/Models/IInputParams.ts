import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { InputTag } from '@/Engine/Domains/Input/Constants';

export type IInputParams = Readonly<{
  tags: ReadonlyArray<InputTag | CommonTags | string>;
}>;
