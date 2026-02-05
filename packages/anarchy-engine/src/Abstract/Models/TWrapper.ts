import type { TSerializable } from '@hellpig/anarchy-engine/Mixins';

import type { TAbstractWrapper } from './TAbstractWrapper';

export type TWrapper<T> = TAbstractWrapper<T> & TSerializable<any>;
