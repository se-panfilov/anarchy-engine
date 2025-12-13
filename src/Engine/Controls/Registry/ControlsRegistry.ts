import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registry';
import type { IControlsRegistry, IControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractEntityRegistry<IControlsWrapper>(RegistryType.Controls));
