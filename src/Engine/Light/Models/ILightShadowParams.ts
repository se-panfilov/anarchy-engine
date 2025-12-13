import type { TVector2 } from '@/Engine/Vector';

export type ILightShadowParams = Readonly<{
  mapSize: TVector2;
  camera: { far: number };
  normalBias: number;
}>;
