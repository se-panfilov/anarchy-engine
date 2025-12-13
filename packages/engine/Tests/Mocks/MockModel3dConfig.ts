import type { TMeters } from '@/Engine/Math';
import type { TModel3dConfig } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';

import { mockMaterialName } from './MockMaterialConfig';

export const mockModel3dName = 'mock_model_3d';

export const mockModel3dConfig: TModel3dConfig = {
  name: mockModel3dName,
  model3dSource: PrimitiveModel3dType.Sphere,
  material: mockMaterialName,
  castShadow: false,
  options: { radius: 1 as TMeters }
};
