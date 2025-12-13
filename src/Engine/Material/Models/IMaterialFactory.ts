import type { IParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialFactory = TReactiveFactory<IMaterialWrapper, IMaterialParams> & IParamsFromConfig<IMaterialConfig, IMaterialParams> & TDestroyable;
