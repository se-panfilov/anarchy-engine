import type { IWrapper } from '@Engine/Models';
import type { ILoopUtils } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tag: string;
  }>;
