import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { ITextWrapper } from '@/Engine/Domains/Text/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type ITextRegistry = IProtectedRegistry<ITextWrapper, IAbstractRegistry<ITextWrapper>>;
