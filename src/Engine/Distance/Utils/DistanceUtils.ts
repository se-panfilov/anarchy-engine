import type { TKilometers, TKilometersPerHour, TMeters, TMetersPerSecond } from '@/Engine/Math/Types';
import { HOUR, SECOND } from '@/Engine/Measurements';

//move with speed in meters per second
export const mpsSpeed = (mps: TMetersPerSecond, delta: number): TMetersPerSecond => (mps * delta) as TMetersPerSecond;

//move with speed in kilometers per hour
export const kmphSpeed = (kmph: TKilometersPerHour, delta: number): TKilometersPerHour => (((kmph * SECOND) / HOUR) * delta) as TKilometersPerHour;

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const metersPerSecond = (meters: number | TMeters): TMetersPerSecond => meters as TMetersPerSecond;
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export const kilometersPerHour = (km: number | TKilometers): TKilometersPerHour => km as TKilometersPerHour;
