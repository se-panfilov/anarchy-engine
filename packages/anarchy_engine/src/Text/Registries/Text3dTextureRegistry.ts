import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Engine/Abstract/Registries';
import type { TText3dTextureRegistry, TText3dTextureWrapper } from '@Engine/Text/Models';

export function Text3dTextureRegistry(): TText3dTextureRegistry {
  return AbstractEntityRegistry<TText3dTextureWrapper>(RegistryType.Text3dTexture);
}
