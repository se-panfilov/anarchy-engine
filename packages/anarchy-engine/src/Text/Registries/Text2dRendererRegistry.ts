import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TText2dRenderer, TText2dRendererRegistry } from '@hellpig/anarchy-engine/Text/Models';

export function Text2dRendererRegistry(): TText2dRendererRegistry {
  return AbstractSimpleRegistry<TText2dRenderer>(RegistryType.TextRenderer);
}
