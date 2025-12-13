import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IFogParams } from './IFogParams';
import type { IFogWrapper } from './IFogWrapper';

export type IFogFactory = IReactiveFactory<IFogWrapper, IFogParams> & IDestroyable;
