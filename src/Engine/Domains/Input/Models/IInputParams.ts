import type { InputTag } from '@Engine/Domains/Input/Constants';

export type IInputParams = Readonly<{
  tags: ReadonlyArray<InputTag>;
}>;
