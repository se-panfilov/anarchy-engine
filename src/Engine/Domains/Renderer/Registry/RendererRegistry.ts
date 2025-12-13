import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryName } from '@Engine/Registries';

import type { IRendererRegistry, IRendererWrapper } from '../Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryName.Renderer));
