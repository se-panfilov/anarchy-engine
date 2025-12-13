import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Engine/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@Engine/Renderer/Models';

export function RendererRegistry(): TRendererRegistry {
  return AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer);
}
