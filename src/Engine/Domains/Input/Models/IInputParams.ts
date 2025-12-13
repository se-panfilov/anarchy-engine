import type { InputTag } from '@Engine/Domains/Input';

export type IInputParams = Readonly<{
  tags: ReadonlyArray<InputTag>;
}>;
