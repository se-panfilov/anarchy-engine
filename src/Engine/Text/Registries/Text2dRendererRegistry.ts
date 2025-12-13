import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Engine/Abstract/Registries';
import type { TText2dRenderer, TText2dRendererRegistry } from '@/Engine/Text/Models';

export const Text2dRendererRegistry = (): TText2dRendererRegistry => AbstractSimpleRegistry<TText2dRenderer>(RegistryType.TextRenderer);
