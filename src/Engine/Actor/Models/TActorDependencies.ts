import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsBodyFacadeService, TPhysicsPresetsService } from '@/Engine/Physics';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
  physicsPresetService: TPhysicsPresetsService;
  physicsBodyFacadeService: TPhysicsBodyFacadeService;
}>;
