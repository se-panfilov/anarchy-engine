import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TControlsRegistry, TControlsWrapper } from '@/Engine/Controls/Models';

export function ControlsRegistry(): TControlsRegistry {
  return AbstractEntityRegistry<TControlsWrapper>(RegistryType.Controls);
}
