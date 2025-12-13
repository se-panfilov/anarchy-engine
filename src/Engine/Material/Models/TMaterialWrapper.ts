import type { TWrapper } from '@/Engine/Abstract';

import type { TMaterialConfig } from './TMaterialConfig';
import type { TMaterialEntityToConfigDependencies } from './TMaterialEntityToConfigDependencies';
import type { TMaterials } from './TMaterials';

export type TMaterialWrapper = Omit<TWrapper<TMaterials>, 'serialize'> &
  Readonly<{
    serialize: (dependencies: TMaterialEntityToConfigDependencies) => TMaterialConfig;
  }>;
