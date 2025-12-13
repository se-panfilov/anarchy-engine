import type { TSpatialGridConfig } from '@/Engine/Spatial';

export const mockSpatialGridName: string = 'mock_grid';

export const mockSpatialGridConfig: TSpatialGridConfig = {
  cellSize: 2,
  centerX: 0,
  centerZ: 0,
  mapHeight: 10,
  mapWidth: 10,
  name: mockSpatialGridName
};
