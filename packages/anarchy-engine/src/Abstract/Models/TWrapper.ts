import type { TSerializable } from '@Anarchy/Engine/Mixins';

import type { TAbstractWrapper } from './TAbstractWrapper';

export type TWrapper<T> = TAbstractWrapper<T> & TSerializable<any>;
