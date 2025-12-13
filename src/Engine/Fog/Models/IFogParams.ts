import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IFogParams = Readonly<{
  TODO: todo;
}> &
  IWithReadonlyTags<string>;
