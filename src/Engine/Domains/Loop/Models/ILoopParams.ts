import type { LoopTag } from '../Constants';

export type ILoopParams = Readonly<{
  tags: ReadonlyArray<LoopTag | string>;
}>;
