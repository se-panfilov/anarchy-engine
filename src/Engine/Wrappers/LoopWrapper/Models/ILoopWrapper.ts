import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';
import type { IWrapper } from '@Engine/Models';
import type { ILoopUtils } from '@Engine/Wrappers';

export type ILoopWrapper = IWrapper<LoopFn> &
  ILoopUtils &
  Readonly<{
    tag: string;
  }>;
