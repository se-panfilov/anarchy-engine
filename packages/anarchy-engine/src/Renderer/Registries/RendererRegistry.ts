import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@Anarchy/Engine/Renderer/Models';

export function RendererRegistry(): TRendererRegistry {
  return AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer);
}
