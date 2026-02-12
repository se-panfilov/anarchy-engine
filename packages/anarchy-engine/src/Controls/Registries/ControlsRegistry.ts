import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TAnyControlsWrapper, TControlsRegistry } from '@Anarchy/Engine/Controls/Models';

export function ControlsRegistry(): TControlsRegistry {
  return AbstractEntityRegistry<TAnyControlsWrapper>(RegistryType.Controls);
}
