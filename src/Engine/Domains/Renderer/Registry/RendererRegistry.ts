import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IRendererRegistry, IRendererWrapper } from '@/Engine/Domains/Renderer/Models';
import { RegistryType } from '@/Engine/Registries';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryType.Renderer));
