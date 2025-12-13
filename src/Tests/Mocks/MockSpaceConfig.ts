import type { TSpaceConfig } from '@/Engine/Space';
import { SpaceSchemaVersion } from '@/Engine/Space';

import { mockSpatialGridConfig } from './MockSpatialGridConfig';

// TODO 12-0-0: Move to the right place
export const mockConfig: TSpaceConfig = {
  entities: {
    actors: [],
    audio: [],
    cameras: [],
    controls: [],
    envMaps: [],
    fogs: [],
    fsm: [],
    intersections: [],
    lights: [],
    models3d: [],
    particles: [],
    physics: {},
    spatialGrids: [mockSpatialGridConfig],
    texts: []
  },
  name: 'mock_space',
  resources: {
    animations: [],
    audio: [],
    envMaps: [],
    materials: [],
    models3d: [],
    textures: []
  },
  scenes: [
    {
      isActive: true,
      name: 'mock_scene'
    }
  ],
  tags: [],
  version: SpaceSchemaVersion.V1
};
