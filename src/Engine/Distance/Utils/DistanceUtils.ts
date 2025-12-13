import type { ILoopTimes } from '@/Engine/Loop';
import { SECOND } from '@/Engine/Measurements';

//move with speed in meters per second
export const mpsSpeed = (mps: number, { delta }: ILoopTimes): number => mps * SECOND * delta;

// TODO (S.Panfilov) check formulas
// TODO (S.Panfilov) extract constants (second, etc)
//move with speed in kilometers per hour
export const kmphSpeed = (kmph: number, { delta }: ILoopTimes): number => ((kmph * SECOND) / 3600) * delta;
