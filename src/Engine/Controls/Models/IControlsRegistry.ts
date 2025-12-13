import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IOrbitControlsWrapper } from './IOrbitControlsWrapper';

export type IControlsRegistry = IProtectedRegistry<IAbstractRegistry<IOrbitControlsWrapper>>;
