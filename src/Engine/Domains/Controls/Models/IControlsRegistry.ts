import type { IAbstractRegistry } from '@Engine/Domains/Abstract';
import type { IControlsWrapper } from '@Engine/Domains/Controls';
import type { IProtectedRegistry } from '@Engine/Models';

export type IControlsRegistry = IProtectedRegistry<IControlsWrapper, IAbstractRegistry<IControlsWrapper>>;
