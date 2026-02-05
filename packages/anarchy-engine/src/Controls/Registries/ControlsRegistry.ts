import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TAnyControlsWrapper, TControlsRegistry } from '@hellpig/anarchy-engine/Controls/Models';

export function ControlsRegistry(): TControlsRegistry {
  return AbstractEntityRegistry<TAnyControlsWrapper>(RegistryType.Controls);
}
