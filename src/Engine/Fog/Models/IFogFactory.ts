import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { IFogConfig } from './IFogConfig';
import type { IFogParams } from './IFogParams';
import type { IFogWrapper } from './IFogWrapper';

export type IFogFactory = TReactiveFactory<IFogWrapper, IFogParams> & TParamsFromConfig<IFogConfig, IFogParams> & TDestroyable;
