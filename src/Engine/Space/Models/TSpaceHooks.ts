import type { TAppCanvas } from '@/Engine/App';
import type { TSpaceConfig, TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Engine/Space/Models';

export type TSpaceHooks = {
  beforeConfigValidation?: (config: TSpaceConfig) => void;
  beforeBaseServicesBuilt?: (canvas: TAppCanvas, params: TSpaceParams) => void;
  beforeLoopsCreated?: (params: TSpaceParams) => void;
  beforeEntitiesServicesBuilt?: (canvas: TAppCanvas, params: TSpaceParams) => void;
  afterAllServicesInitialized?: (canvas: TAppCanvas, services: TSpaceServices, loops: TSpaceLoops, params: TSpaceParams) => void;
  beforeResourcesLoaded?: (config: TSpaceConfig, services: TSpaceServices, loops: TSpaceLoops) => void;
  beforeEntitiesCreated?: (data: TSpaceConfig | TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
  afterEntitiesCreated?: (data: TSpaceConfig | TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
};
