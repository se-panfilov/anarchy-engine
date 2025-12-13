import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TAnyControlsWrapper, TControlsRegistry } from '@/Controls/Models';

export function ControlsRegistry(): TControlsRegistry {
  return AbstractEntityRegistry<TAnyControlsWrapper>(RegistryType.Controls);
}
