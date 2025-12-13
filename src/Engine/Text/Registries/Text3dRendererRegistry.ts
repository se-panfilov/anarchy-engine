import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TText3dRenderer, TText3dRendererRegistry } from '@/Engine/Text/Models';

export const Text3dRendererRegistry = (): TText3dRendererRegistry => RegistryFacade(AbstractSimpleRegistry<TText3dRenderer>(RegistryType.TextRenderer));
