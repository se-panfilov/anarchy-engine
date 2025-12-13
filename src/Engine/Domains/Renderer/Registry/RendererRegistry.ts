import { AbstractRegistry, RegistryFacade } from '@Engine/Domains/Abstract';
import { RegistryType } from '@Engine/Registries';

import type { IRendererRegistry, IRendererWrapper } from '@/Engine/Domains/Renderer/Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryType.Renderer));
