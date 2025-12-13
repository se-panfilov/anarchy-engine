import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry } from '@/Engine/Abstract/Registries';
import type { TText3dRenderer, TText3dRendererRegistry } from '@/Engine/Text/Models';

export const Text3dRendererRegistry = (): TText3dRendererRegistry => AbstractSimpleRegistry<TText3dRenderer>(RegistryType.TextRenderer);
