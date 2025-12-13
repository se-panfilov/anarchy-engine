import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IRendererRegistry, IRendererWrapper } from '../Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryType.Renderer));
