import type { TModel3dConfig } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';

export const mockModel3dName = 'mock_model_3d';

// TODO 12-0-0: Move to the right place
export const params: TModel3dConfig = {
  name: mockModel3dName,
  model3dSource: PrimitiveModel3dType.Sphere
};
