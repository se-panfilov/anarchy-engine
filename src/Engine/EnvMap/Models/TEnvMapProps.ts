import type { AnyMapping } from 'three';

import type { TWithNameRequired } from '@/Engine/Mixins';

export type TEnvMapProps = Readonly<{
  texture: string;
  isActive: boolean;
  mapping?: AnyMapping;
}> &
  TWithNameRequired;
