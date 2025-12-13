import type { IDestroyablePool } from '@Engine/Domains/Mixins';
import type { IDestroyableFactories } from '@Engine/Pool';

export type ILocalFactoryPool = IDestroyablePool<IDestroyableFactories>;
