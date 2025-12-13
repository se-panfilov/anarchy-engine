import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TControlsRegistry, TControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): TControlsRegistry => AbstractEntityRegistry<TControlsWrapper>(RegistryType.Controls);
