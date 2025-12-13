import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@/Renderer/Models';

export function RendererRegistry(): TRendererRegistry {
  return AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer);
}
