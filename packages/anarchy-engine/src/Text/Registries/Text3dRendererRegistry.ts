import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TText3dRenderer, TText3dRendererRegistry } from '@Anarchy/Engine/Text/Models';

export function Text3dRendererRegistry(): TText3dRendererRegistry {
  return AbstractSimpleRegistry<TText3dRenderer>(RegistryType.TextRenderer);
}
