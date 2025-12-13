import type { TWrapper } from '@/Engine/Abstract';
import type { TWithTagsMixin } from '@/Engine/Mixins';

import type { IMaterials } from './IMaterials';

export type IMaterialWrapper = TWrapper<IMaterials> & TWithTagsMixin;
