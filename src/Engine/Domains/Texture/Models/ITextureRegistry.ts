import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { IProtectedRegistry } from '@/Engine/Mixins';

import type { ITextureWrapper } from './ITextureWrapper';

export type ITextureRegistry = IProtectedRegistry<ITextureWrapper, IAbstractRegistry<ITextureWrapper>>;
