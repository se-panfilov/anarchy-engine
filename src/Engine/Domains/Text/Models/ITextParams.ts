import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { ITextProps } from '@/Engine/Domains/Text/Models';
import type { IObject3DPropParams } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type ITextParams = ITextProps & IObject3DPropParams & IWithReadonlyTags<TextTag>;
