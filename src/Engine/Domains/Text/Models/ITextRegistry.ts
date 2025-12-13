import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { ITextAnyWrapper } from '@/Engine/Domains/Text/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type ITextRegistry = IProtectedRegistry<ITextAnyWrapper, IAbstractRegistry<ITextAnyWrapper>>;
