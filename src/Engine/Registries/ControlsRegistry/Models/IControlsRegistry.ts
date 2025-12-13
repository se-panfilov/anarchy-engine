import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';
import type { IControlsWrapper } from '@Engine/Wrappers';

export type IControlsRegistry = IProtectedRegistry<IControlsWrapper, IAbstractRegistry<IControlsWrapper>>;
