import type { TAppCanvas } from '@/Engine/App';
import type { TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Engine/Space/Models';

export type TSpaceHooks = {
  beforeConfigValidation?: (config: TSpaceParams) => void;
  beforeBaseServicesBuilt?: (canvas: TAppCanvas, config: TSpaceParams) => void;
  beforeLoopsCreated?: (config: TSpaceParams) => void;
  beforeEntitiesServicesBuilt?: (canvas: TAppCanvas, config: TSpaceParams) => void;
  beforeResourcesLoaded?: (config: TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
  beforeEntitiesCreatedFromConfig?: (config: TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
  afterEntitiesCreatedFromConfig?: (config: TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
};
