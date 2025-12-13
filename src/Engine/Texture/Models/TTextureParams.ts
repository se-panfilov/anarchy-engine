import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TTextureProps } from './TTextureProps';

export type TTextureParams = TTextureProps & TWithName & TWithReadonlyTags;
