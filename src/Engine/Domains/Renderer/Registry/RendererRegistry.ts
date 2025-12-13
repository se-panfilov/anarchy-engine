import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Domains/Abstract';
import type { IRendererRegistry, IRendererWrapper } from '@/Engine/Domains/Renderer/Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryType.Renderer));
