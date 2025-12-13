import type { TWithNameRequired, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TWithMaterialType } from './TWithMaterialType';
// TODO 9.0.0. RESOURCES: Check all entities in registries: should have names, tags and etc.
export type TMaterialProps = Readonly<{ options?: Record<string, any> }> & TWithMaterialType & TWithNameRequired & TWithReadonlyTags;
