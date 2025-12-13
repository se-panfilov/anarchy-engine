import { RegistryType } from '@/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Abstract/Registries';
import type { TText3dRenderer, TText3dRendererRegistry } from '@/Text/Models';

export function Text3dRendererRegistry(): TText3dRendererRegistry {
  return AbstractSimpleRegistry<TText3dRenderer>(RegistryType.TextRenderer);
}
