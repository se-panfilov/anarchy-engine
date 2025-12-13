import type { TMaterialConfig } from '@/Material';
import { MaterialType } from '@/Material';

export const mockMaterialName = 'mock_material';

export const mockMaterialConfig: TMaterialConfig = {
  type: MaterialType.Standard,
  name: mockMaterialName
};
