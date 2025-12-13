import type { IControlsWrapper } from '@Engine/Domains/Controls/Models';
import type { IAbstractRegistry, IProtectedRegistry } from '@Engine/Models';

export type IControlsRegistry = IProtectedRegistry<IControlsWrapper, IAbstractRegistry<IControlsWrapper>>;
