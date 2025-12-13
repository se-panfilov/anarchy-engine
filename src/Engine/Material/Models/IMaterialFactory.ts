import type { IAsyncReactiveFactory, IParamsFromConfig } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IMaterialConfig } from './IMaterialConfig';
import type { IMaterialParams } from './IMaterialParams';
import type { IMaterialWrapperAsync } from './IMaterialWrapperAsync';

export type IMaterialFactory = IAsyncReactiveFactory<IMaterialWrapperAsync, IMaterialParams> & IParamsFromConfig<IMaterialConfig, IMaterialParams> & IDestroyable;
