import type { TActive, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapParams = Readonly<{
  texture: TEnvMapTexture;
}> &
  TActive &
  TWithName &
  TWithTags;
