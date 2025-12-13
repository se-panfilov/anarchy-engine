import { RegistryType } from '@Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Engine/Abstract/Registries';
import type { TAnyControlsWrapper, TControlsRegistry } from '@Engine/Controls/Models';

export function ControlsRegistry(): TControlsRegistry {
  return AbstractEntityRegistry<TAnyControlsWrapper>(RegistryType.Controls);
}
