import type { TVector2 } from '@/Engine/Vector';

export type TLightShadowParams = Readonly<{
  mapSize: TVector2;
  camera: { far?: number; near?: number };
  normalBias: number;
}>;
