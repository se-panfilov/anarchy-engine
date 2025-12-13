import type { TActive, TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapParams = Readonly<{
  texture: TEnvMapTexture;
}> &
  TActive &
  TWithName &
  TWithReadonlyTags;
