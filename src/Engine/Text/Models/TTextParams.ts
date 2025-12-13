import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TTextProps } from '@/Engine/Text/Models';
import type { TObject3DParams } from '@/Engine/ThreeLib';

export type TTextParams = TTextProps & TObject3DParams & TWithReadonlyTags;
