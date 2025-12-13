import type { TAppCanvas } from '@/Engine/App';
import type { TSpaceConfig, TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';

export type TSpaceHooks = {
  beforeConfigValidation?: (config: TSpaceConfig) => void;
  beforeBaseServicesBuilt?: (canvas: TAppCanvas, config: TSpaceConfig) => void;
  beforeLoopsCreated?: (config: TSpaceConfig) => void;
  beforeEntitiesServicesBuilt?: (canvas: TAppCanvas, config: TSpaceConfig) => void;
  beforeResourcesLoaded?: (config: TSpaceConfig, services: TSpaceServices, loops: TSpaceLoops) => void;
  beforeEntitiesCreated?: (config: TSpaceConfig, services: TSpaceServices, loops: TSpaceLoops) => void;
  afterEntitiesCreated?: (config: TSpaceConfig, services: TSpaceServices, loops: TSpaceLoops) => void;
};
