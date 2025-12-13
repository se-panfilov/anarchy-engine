import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialParams } from './TMaterialParams';
import type { TMaterialWrapper } from './TMaterialWrapper';

export type TMaterialFactory = TReactiveFactory<TMaterialWrapper, TMaterialParams> & TParamsFromConfig<TMaterialConfig, TMaterialParams> & TDestroyable;
