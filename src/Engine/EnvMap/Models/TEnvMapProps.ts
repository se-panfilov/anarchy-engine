import type { AnyMapping } from 'three';

export type TEnvMapProps = Readonly<{
  url: string;
  isActive: boolean;
  mapping?: AnyMapping;
}>;
