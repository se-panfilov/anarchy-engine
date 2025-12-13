import type { TSerializable } from '@Engine/Mixins';

import type { TAbstractEntity } from './TAbstractEntity';

export type TEntity<T extends Record<string, any>> = TAbstractEntity<T> & TSerializable<any>;
