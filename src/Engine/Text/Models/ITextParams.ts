import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { TextTag } from '@/Engine/Text/Constants';
import type { ITextProps } from '@/Engine/Text/Models';
import type { IObject3DParams } from '@/Engine/ThreeLib';

export type ITextParams = ITextProps & IObject3DParams & IWithReadonlyTags<TextTag>;
