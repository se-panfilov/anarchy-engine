import type { Vector } from '@dimforge/rapier3d/math';
import { Vector3 } from 'three';

import type { TDegrees, TRadians } from '@/Engine/Math/Types';
import { HOUR, METER, MINUTE, SECOND } from '@/Engine/Measurements/Constants';

// TODO MATH: need precision calculations??? (or not? how performant they are?)
export const meters = (meters: number): number => meters * METER;
export const centimetersToMeters = (cm: number): number => cm / 100;
export const kilometersToMeters = (km: number): number => km * 1000 * METER;

export const secondsToMS = (seconds: number): number => seconds * SECOND;
export const minutesToMS = (minutes: number): number => minutes * MINUTE;
export const hoursToMS = (hours: number): number => hours * HOUR;

export const coordsXYZToMeters = ({ x, y, z }: Vector3 | Vector): Vector3 => new Vector3(meters(x), meters(y), meters(z));

export const radians = (value: number): TRadians => value as TRadians;
export const degrees = (value: number): TDegrees => value as TDegrees;
