import { HOUR, SECOND } from '@/Engine/Measurements';

//move with speed in meters per second
export const mpsSpeed = (mps: number, delta: number): number => mps * delta;

//move with speed in kilometers per hour
export const kmphSpeed = (kmph: number, delta: number): number => ((kmph * SECOND) / HOUR) * delta;
