import type { TWithName } from '@/Engine/Mixins';

export type TActorProps = Readonly<{
  castShadow: boolean;
  receiveShadow: boolean;
}> &
  TWithName;
