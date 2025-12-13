import type { IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { ITextAnyWrapper } from '@/Engine/Text/Models';

export type ITextRegistry<T extends ITextAnyWrapper> = IProtectedRegistry<IAbstractRegistry<T>>;
