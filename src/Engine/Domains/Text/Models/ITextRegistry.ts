import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Domains/Abstract';
import type { ITextAnyWrapper } from '@/Engine/Domains/Text/Models';

export type ITextRegistry<T extends ITextAnyWrapper> = IProtectedRegistry<T, IAbstractRegistry<T>>;
