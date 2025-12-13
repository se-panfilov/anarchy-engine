import type { TSerializable, TWithSerializableEntities } from '@/Mixins';

import type { TAbstractService } from './TAbstractService';

export type TSerializableEntitiesService<E extends TSerializable<any>, C extends Record<string, any>> = TAbstractService & TWithSerializableEntities<E, C>;
