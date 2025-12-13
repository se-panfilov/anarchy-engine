import type { MaterialType } from '@/Engine/Material/Constants';

export type IWithMaterialType = Readonly<{
  type: MaterialType;
}>;
