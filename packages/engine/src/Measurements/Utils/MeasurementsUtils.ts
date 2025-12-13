import type { Vector } from '@dimforge/rapier3d/math';
import { Vector3 } from 'three';

import type { TDegrees, TMeters, TMilliseconds, TRadians, TSeconds } from '@/Math/Types';
import { HOUR, METER, MINUTE, SECOND } from '@/Measurements/Constants';

// TODO CONFIG: values of meters/hours, etc should be configurable
export const meters = (meters: number): TMeters => (meters * METER) as TMeters;
export const centimetersToMeters = (cm: number): TMeters => ((cm / 100) * METER) as TMeters;
export const kilometersToMeters = (km: number): TMeters => (km * 1000 * METER) as TMeters;

export const secondsToMS = (seconds: number | TSeconds): TMilliseconds => (seconds * SECOND) as TMilliseconds;
export const minutesToMS = (minutes: number): TMilliseconds => (minutes * MINUTE) as TMilliseconds;
export const hoursToMS = (hours: number): TMilliseconds => (hours * HOUR) as TMilliseconds;
export const milliseconds = (ms: number): TMilliseconds => ms as TMilliseconds;

export const coordsXYZToMeters = ({ x, y, z }: Vector3 | Vector): Vector3 => new Vector3(meters(x), meters(y), meters(z));

export const radians = (value: number): TRadians => value as TRadians;
export const degrees = (value: number): TDegrees => value as TDegrees;
