import type { TWithSerializeAllEntities } from '@/Engine/Mixins';

import type { TAbstractService } from './TAbstractService';

export type TSerializableEntitiesService<C> = TAbstractService & TWithSerializeAllEntities<C>;
