import type { TAbstractService } from './TAbstractService';

export type TSerializableEntitiesService<C> = TAbstractService &
  Readonly<{
    serializeAllEntities: () => ReadonlyArray<C>;
  }>;
