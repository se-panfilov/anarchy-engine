import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractSimpleRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IText2dRenderer, IText2dRendererRegistry } from '@/Engine/Text/Models';

export const Text2dRendererRegistry = (): IText2dRendererRegistry => RegistryFacade(AbstractSimpleRegistry<IText2dRenderer>(RegistryType.TextRenderer));
