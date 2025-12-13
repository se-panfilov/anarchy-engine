import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsBodyService, TPhysicsPresetsService } from '@/Engine/Physics';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
  physicsPresetService: TPhysicsPresetsService;
  physicsBodyService: TPhysicsBodyService;
}>;
