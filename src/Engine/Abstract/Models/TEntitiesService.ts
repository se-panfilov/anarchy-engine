import type { TAbstractService } from './TAbstractService';

export type TEntitiesService = TAbstractService &
  Readonly<{
    serializeAllEntities: () => void;
  }>;
