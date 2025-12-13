import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TText2dRenderer, TText2dRendererRegistry } from '@Anarchy/Engine/Text/Models';

export function Text2dRendererRegistry(): TText2dRendererRegistry {
  return AbstractSimpleRegistry<TText2dRenderer>(RegistryType.TextRenderer);
}
