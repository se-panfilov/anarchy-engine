import type { TAppCanvas } from '@/Engine/App';
import type { TSpaceConfig, TSpaceServices } from '@/Engine/Space/Models';

export type TSpaceHooks = {
  beforeConfigValidation?: (config: TSpaceConfig) => void;
  afterConfigValidation?: (config: TSpaceConfig) => void;
  beforeServicesPrepared?: (canvas: TAppCanvas, config: TSpaceConfig) => void;
  afterServicesPrepared?: (canvas: TAppCanvas, config: TSpaceConfig, services: TSpaceServices) => void;
  beforeResourcesLoaded?: (config: TSpaceConfig, services: TSpaceServices) => void;
  afterResourcesLoaded?: (config: TSpaceConfig, services: TSpaceServices) => void;
  beforeEntitiesCreated?: (config: TSpaceConfig, services: TSpaceServices) => void;
  afterEntitiesCreated?: (config: TSpaceConfig, services: TSpaceServices) => void;
};
