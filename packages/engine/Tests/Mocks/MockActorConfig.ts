import type { TActorConfig } from '@/Actor';

import { mockModel3dName } from './MockModel3dConfig';
import { mockSpatialGridName } from './MockSpatialGridConfig';

export const mockActorConfig: TActorConfig = {
  name: 'mock-actor',
  model3dSource: mockModel3dName,
  spatial: {
    grid: mockSpatialGridName,
    isAutoUpdate: false
  },
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0, w: 0 }
};
