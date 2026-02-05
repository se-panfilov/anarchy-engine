import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TRendererRegistry, TRendererWrapper } from '@hellpig/anarchy-engine/Renderer/Models';

export function RendererRegistry(): TRendererRegistry {
  return AbstractEntityRegistry<TRendererWrapper>(RegistryType.Renderer);
}
