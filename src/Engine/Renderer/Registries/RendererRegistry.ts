import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { IRendererRegistry, TRendererWrapper } from '@/Engine/Renderer/Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer));
