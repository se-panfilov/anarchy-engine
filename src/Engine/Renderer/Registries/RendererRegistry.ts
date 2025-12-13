import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@/Engine/Renderer/Models';

export const RendererRegistry = (): TRendererRegistry => AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer);
