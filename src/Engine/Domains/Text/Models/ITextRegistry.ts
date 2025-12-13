import type { IAbstractRegistry } from '@/Engine/Domains/Abstract';
import type { IText2dWrapper, IText3dWrapper } from '@/Engine/Domains/Text/Models';
import type { IProtectedRegistry } from '@/Engine/Mixins';

export type ITextRegistry = IProtectedRegistry<IText2dWrapper | IText3dWrapper, IAbstractRegistry<IText2dWrapper | IText3dWrapper>>;
