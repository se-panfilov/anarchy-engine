import type { TSpaceConfig } from '@/Engine/Space';
import { SpaceSchemaVersion } from '@/Engine/Space';

import { mockSpatialGridConfig } from './MockSpatialGridConfig';

export const mockConfig: TSpaceConfig = {
  canvasSelector: '#mock_canvas',
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
    materials: [],
    models3d: [],
    particles: [],
    physics: {},
    renderers: [],
    spatialGrids: [mockSpatialGridConfig],
    texts: []
  },
  name: 'mock_space',
  resources: {
    animations: [],
    audio: [],
    envMaps: [],
    models3d: [],
    textures: []
  },
  scenes: [
    {
      isActive: true,
      name: 'mock_scene'
    }
  ],
  version: SpaceSchemaVersion.V1
};
