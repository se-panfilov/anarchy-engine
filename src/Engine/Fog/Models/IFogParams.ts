import type { IWithReadonlyTags } from '@/Engine/Mixins';

import type { IFogProps } from './IFogProps';

export type IFogParams = IFogProps & IWithReadonlyTags<string>;
