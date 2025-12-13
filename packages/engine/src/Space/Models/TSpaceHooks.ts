import type { TSpaceCanvas } from '@/Space';
import type { TSpaceConfig, TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Space/Models';

export type TSpaceHooks = {
  beforeConfigValidation?: (config: TSpaceConfig) => void;
  beforeBaseServicesBuilt?: (canvas: TSpaceCanvas, params: TSpaceParams) => void;
  beforeLoopsCreated?: (params: TSpaceParams) => void;
  beforeEntitiesServicesBuilt?: (canvas: TSpaceCanvas, params: TSpaceParams) => void;
  afterAllServicesInitialized?: (canvas: TSpaceCanvas, services: TSpaceServices, loops: TSpaceLoops, params: TSpaceParams) => void;
  beforeResourcesLoaded?: (config: TSpaceConfig, services: TSpaceServices, loops: TSpaceLoops) => void;
  beforeEntitiesCreated?: (data: TSpaceConfig | TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
  afterEntitiesCreated?: (data: TSpaceConfig | TSpaceParams, services: TSpaceServices, loops: TSpaceLoops) => void;
};
