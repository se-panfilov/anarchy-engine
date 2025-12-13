import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TWithMaterialType } from './TWithMaterialType';

export type TMaterialProps = Readonly<{ options?: Record<string, any> }> & TWithMaterialType & TWithName & TWithReadonlyTags;
