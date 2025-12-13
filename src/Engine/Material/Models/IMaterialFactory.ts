import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialWrapper } from './IMaterialWrapper';

export type IMaterialFactory = IReactiveFactory<IMaterialWrapper, IMaterialParams> & IParamsFromConfig<IMaterialConfig, IMaterialParams> & IDestroyable;
