import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';

import type { TAbstractEntity } from './TAbstractEntity';

export type TEntity<T extends Record<string, any>> = TAbstractEntity<T> & TSerializable<any>;
