import type { TActive, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';

import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapParams = Readonly<{
  texture: TEnvMapTexture;
}> &
  TActive &
  TWithName &
  TWithTags;
