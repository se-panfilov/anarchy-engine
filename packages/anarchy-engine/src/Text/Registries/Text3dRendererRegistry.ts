import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TText3dRenderer, TText3dRendererRegistry } from '@hellpig/anarchy-engine/Text/Models';

export function Text3dRendererRegistry(): TText3dRendererRegistry {
  return AbstractSimpleRegistry<TText3dRenderer>(RegistryType.TextRenderer);
}
