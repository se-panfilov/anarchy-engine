import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Animations/Adapters';
import type { TAnimationsFsm, TAnimationsFsmFactory, TAnimationsFsmParams } from '@/Engine/Animations/Models';
import { AnimationsFsmWrapper } from '@/Engine/Animations/Wrappers';

const factory: TReactiveFactory<TAnimationsFsm, TAnimationsFsmParams> = ReactiveFactory(FactoryType.AnimationsFsm, AnimationsFsmWrapper);
export const AnimationsFsmFactory = (): TAnimationsFsmFactory => ({ ...factory, configToParams });
