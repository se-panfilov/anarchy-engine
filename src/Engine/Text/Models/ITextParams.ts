import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { ITextProps } from '@/Engine/Text/Models';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type ITextParams = ITextProps & TObject3DParams & TWithReadonlyTags;
