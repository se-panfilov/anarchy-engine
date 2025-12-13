import type { TAbstractWatcher } from '@Anarchy/Engine/Abstract';
import type { TSerializable } from '@Anarchy/Engine/Mixins';

export type TWatcher<T> = TAbstractWatcher<T> & TSerializable<any>;
