import { BehaviorSubject } from 'rxjs';

import type { TSpace, TSpaceConfig, TSpatialGridWrapper } from '@/Engine';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceSpatial.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

export const spaceSpatialData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    const grid: TSpatialGridWrapper = space.services.spatialGridService.getRegistry().getByName('main_grid');
    grid._debugVisualizeCells(space.services.scenesService.getActive());
  },
  onChange: (space: TSpace): void => {
    const grid: TSpatialGridWrapper = space.services.spatialGridService.getRegistry().getByName('main_grid');
    grid._removeDebugVisualizeCells(space.services.scenesService.getActive());

    // const grid: TSpatialGridWrapper = space.services.spatialGridService.getRegistry().getByName('main_grid');
    const newGrid: TSpatialGridWrapper = space.services.spatialGridService.create({
      cellSize: 20,
      centerX: 0,
      centerZ: 0,
      mapHeight: 40,
      mapWidth: 40,
      name: 'new_grid'
    });

    newGrid._debugVisualizeCells(space.services.scenesService.getActive());
  }
};
