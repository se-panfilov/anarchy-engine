import { LoopTag } from '@Engine/Constants';

export type ILoopParams = Readonly<{
  tags: ReadonlyArray<LoopTag | string>;
}>;
