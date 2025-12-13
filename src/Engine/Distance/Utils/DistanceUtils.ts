import { SECOND } from '@/Engine/Measurements';

//move with speed in meters per second
export const mpsSpeed = (mps: number, delta: number): number => mps * delta;

// TODO (S.Panfilov) check formulas
// TODO (S.Panfilov) extract constants (second, etc)
//move with speed in kilometers per hour
export const kmphSpeed = (kmph: number, delta: number): number => ((kmph * SECOND) / 3600) * delta;
