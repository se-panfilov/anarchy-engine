import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@/Engine/Renderer/Models';

export const RendererRegistry = (): TRendererRegistry => RegistryFacade(AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer));
