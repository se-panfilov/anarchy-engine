import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Engine/Abstract/Registries';
import type { TText2dRenderer, TText2dRendererRegistry } from '@/Engine/Text/Models';

export function Text2dRendererRegistry(): TText2dRendererRegistry {
  return AbstractSimpleRegistry<TText2dRenderer>(RegistryType.TextRenderer);
}
