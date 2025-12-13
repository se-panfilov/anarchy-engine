import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from 'src/Engine/Abstract/Registries';
import type { IControlsRegistry, IControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractEntityRegistry<IControlsWrapper>(RegistryType.Controls));
