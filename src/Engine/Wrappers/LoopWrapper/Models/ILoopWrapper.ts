import type { AbstractWrapper } from '@Engine/Wrappers';
import type { LoopFn } from '@Engine/Wrappers/LoopWrapper/Models/LoopFn';
import type { getUtils } from '../utils';

export type ILoopWrapper = ReturnType<typeof AbstractWrapper<LoopFn>> & ReturnType<typeof getUtils>;
