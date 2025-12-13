import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsAnimationsFsm } from '@/Engine/Animations/Adapters';
import type { TAnimationsFsmFactory, TAnimationsFsmParams, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';
import { AnimationsFsmWrapper } from '@/Engine/Animations/Wrappers';

const factory: TReactiveFactory<TAnimationsFsmWrapper, TAnimationsFsmParams> = ReactiveFactory(FactoryType.AnimationsFsm, AnimationsFsmWrapper);
export const AnimationsFsmFactory = (): TAnimationsFsmFactory => ({ ...factory, configToParams: configToParamsAnimationsFsm });
