import type { TMaterialConfig } from '@/Engine/Material';
import { MaterialType } from '@/Engine/Material';

export const mockMaterialName = 'mock_material';

export const mockMaterialConfig: TMaterialConfig = {
  type: MaterialType.Standard,
  name: mockMaterialName
};
