import { AbstractRegistry, RegistryFacade } from '@/Engine/Domains/Abstract';
import type { IControlsRegistry, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { RegistryType } from '@/Engine/Registries';

export const ControlsRegistry = (): IControlsRegistry => RegistryFacade(AbstractRegistry<IOrbitControlsWrapper>(RegistryType.Controls));
