import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TAbstractLightWrapper, TAnyLightConfig, TLight, TLightParams } from '@/Engine/Light/Models';
import type { TDestroyable } from '@/Engine/Mixins';

export type TLightFactory = TReactiveFactory<TAbstractLightWrapper<TLight>, TLightParams> & TParamsFromConfig<TAnyLightConfig, TLightParams> & TDestroyable;
