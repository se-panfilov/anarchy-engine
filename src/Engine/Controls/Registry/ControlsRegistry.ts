import { AbstractRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Controls/Models';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IOrbitControlsWrapper>(RegistryType.Controls));
