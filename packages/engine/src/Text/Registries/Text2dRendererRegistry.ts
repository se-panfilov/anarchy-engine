import { RegistryType } from '@/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Abstract/Registries';
import type { TText2dRenderer, TText2dRendererRegistry } from '@/Text/Models';

export function Text2dRendererRegistry(): TText2dRendererRegistry {
  return AbstractSimpleRegistry<TText2dRenderer>(RegistryType.TextRenderer);
}
