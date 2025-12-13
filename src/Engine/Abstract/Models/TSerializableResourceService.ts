import type { TAbstractService } from './TAbstractService';

export type TSerializableResourceService<C> = TAbstractService &
  Readonly<{
    serializeAllResources: () => ReadonlyArray<C>;
  }>;
