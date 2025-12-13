import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry, RegistryFacade } from '@/Engine/Abstract/Registries';
import type { TAnimationsFsmRegistry, TAnimationsFsmWrapper } from '@/Engine/Animations/Models';

export const AnimationsFsmRegistry = (): TAnimationsFsmRegistry => RegistryFacade(AbstractEntityRegistry<TAnimationsFsmWrapper>(RegistryType.AnimationsFsm));
