import type { TSpace, TSpaceConfig, TSpatialGridWrapper } from '@hellpig/anarchy-engine';
import { BehaviorSubject } from 'rxjs';

import type { TSpacesData } from '../ShowcaseTypes';
import { getContainer } from '../utils';
import spaceConfig from './spaceSpatial.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

let isOriginalSceneLoaded: boolean = true;
const mainGridName: string = 'main_grid';
const newGridName: string = 'new_grid';

export const spaceSpatialData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onCreate: (space: TSpace): void | never => {
    const grid: TSpatialGridWrapper = space.services.spatialGridService.getRegistry().getByName(isOriginalSceneLoaded ? mainGridName : newGridName);
    grid._debugVisualizeCells(space.services.scenesService.getActive());
  },
  onChange: (space: TSpace): void => {
    const grid: TSpatialGridWrapper = space.services.spatialGridService.getRegistry().getByName(mainGridName);
    grid._removeDebugVisualizeCells(space.services.scenesService.getActive());

    const newGrid: TSpatialGridWrapper = space.services.spatialGridService.create({
      cellSize: 20,
      centerX: 0,
      centerZ: 0,
      mapHeight: 40,
      mapWidth: 40,
      name: newGridName
    });

    newGrid._debugVisualizeCells(space.services.scenesService.getActive());
    isOriginalSceneLoaded = false;
  }
};
