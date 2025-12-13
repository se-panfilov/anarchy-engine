import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { ITextProps } from '@/Engine/Text/Models';
import type { IObject3DParams } from '@/Engine/ThreeLib';

export type ITextParams = ITextProps & IObject3DParams & TWithReadonlyTags;
