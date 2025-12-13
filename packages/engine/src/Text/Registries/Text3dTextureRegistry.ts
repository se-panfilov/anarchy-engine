import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TText3dTextureRegistry, TText3dTextureWrapper } from '@/Text/Models';

export function Text3dTextureRegistry(): TText3dTextureRegistry {
  return AbstractEntityRegistry<TText3dTextureWrapper>(RegistryType.Text3dTexture);
}
