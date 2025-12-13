import type { TWrapper } from '@/Engine/Abstract';
import type { TWithTagsMixin } from '@/Engine/Mixins';

import type { TMaterials } from './TMaterials';

export type TMaterialWrapper = TWrapper<TMaterials> & TWithTagsMixin;
