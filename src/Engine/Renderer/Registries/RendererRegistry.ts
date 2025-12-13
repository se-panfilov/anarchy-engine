import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IRendererRegistry, IRendererWrapper } from '@/Engine/Renderer/Models';

export const RendererRegistry = (): IRendererRegistry => RegistryFacade(AbstractEntityRegistry<IRendererWrapper>(RegistryType.Renderer));
