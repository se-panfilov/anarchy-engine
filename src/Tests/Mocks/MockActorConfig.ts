import type { TActorConfig } from '@/Engine/Actor';

import { mockModel3dName } from './MockModel3dConfig';
import { mockSpatialGridName } from './MockSpatialGridConfig';

// TODO 12-0-0: Move to the right place
export const mockActorConfig: TActorConfig = {
  model3dSource: mockModel3dName,
  spatial: {
    grid: mockSpatialGridName,
    isAutoUpdate: false
  },
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0, w: 0 }
};
