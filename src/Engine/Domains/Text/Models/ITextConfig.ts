import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextProps } from './ITextProps';

export type ITextConfig = ITextProps & IObject3DPropConfig & IWithReadonlyTags<TextTag>;
