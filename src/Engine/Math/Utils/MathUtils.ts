import Decimal from 'decimal.js';

export const degToRad = (degrees: number): Decimal => new Decimal(degrees).times(Math.PI).div(180);
export const cos = (value: Decimal): Decimal => new Decimal(Math.cos(value.toNumber()));
export const sin = (value: Decimal): Decimal => new Decimal(Math.sin(value.toNumber()));
