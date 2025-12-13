import type { TWithCoordsXY } from '@/Engine/Mixins';

export type TMousePosition = Readonly<{
  coords: TWithCoordsXY;
  normalizedCoords: TWithCoordsXY;
}>;
