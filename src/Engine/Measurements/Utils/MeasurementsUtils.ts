import { HOUR, METER, MINUTE, SECOND } from '@/Engine/Measurements/Constants';
import type { TWithCoordsXYZ } from '@/Engine/Mixins';

// TODO (S.Panfilov) MATH: need precision calculations??? (or not? how performant they are?)
export const meters = (meters: number): number => meters * METER;
export const centimetersToMeters = (cm: number): number => cm / 100;
export const kilometersToMeters = (km: number): number => km * 1000 * METER;

export const secondsToMS = (seconds: number): number => seconds * SECOND;
export const minutesToMS = (minutes: number): number => minutes * MINUTE;
export const hoursToMS = (hours: number): number => hours * HOUR;

export const coordsXYZToMeters = ({ x, y, z }: TWithCoordsXYZ): TWithCoordsXYZ => ({ x: meters(x), y: meters(y), z: meters(z) });
