import type { TWithNameRequired } from '@/Engine/Mixins';

import type { TWithMaterialType } from './TWithMaterialType';

export type TMaterialProps = Readonly<{ options?: Record<string, any> }> & TWithMaterialType & TWithNameRequired;
