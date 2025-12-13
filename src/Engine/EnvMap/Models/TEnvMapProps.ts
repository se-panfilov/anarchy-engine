import type { TWithNameRequired } from '@/Engine/Mixins';

export type TEnvMapProps = Readonly<{
  texture: string;
  isActive: boolean;
}> &
  TWithNameRequired;
