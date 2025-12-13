import { HOUR, METER, MINUTE, SECOND } from '@/Engine/Measurements/Constants';

// TODO (S.Panfilov) MATH: need precision calculations??? (or not? how performant they are?)
export const centimeters = (cm: number): number => cm / 100;
export const meters = (meters: number): number => meters * METER;
export const kilometers = (km: number): number => km * 1000 * METER;
export const seconds = (seconds: number): number => seconds * SECOND;
export const minutes = (minutes: number): number => minutes * MINUTE;
export const hours = (hours: number): number => hours * HOUR;
