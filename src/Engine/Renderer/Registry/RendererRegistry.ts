import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer/Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractRegistry<IRendererWrapper>(RegistryType.Renderer));
