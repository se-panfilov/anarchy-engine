import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IText3dRenderer, IText3dRendererRegistry } from '@/Engine/Text/Models';

export const Text3dRendererRegistry = (): IText3dRendererRegistry => RegistryFacade(AbstractSimpleRegistry<IText3dRenderer>(RegistryType.TextRenderer));
