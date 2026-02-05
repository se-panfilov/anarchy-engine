import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TText3dTextureRegistry, TText3dTextureWrapper } from '@hellpig/anarchy-engine/Text/Models';

export function Text3dTextureRegistry(): TText3dTextureRegistry {
  return AbstractEntityRegistry<TText3dTextureWrapper>(RegistryType.Text3dTexture);
}
