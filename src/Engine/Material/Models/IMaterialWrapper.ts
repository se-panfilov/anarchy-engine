import type { TWrapper } from '@/Engine/Abstract';
import type { IWithTagsMixin } from '@/Engine/Mixins';

import type { IMaterials } from './IMaterials';

export type IMaterialWrapper = TWrapper<IMaterials> & IWithTagsMixin;
