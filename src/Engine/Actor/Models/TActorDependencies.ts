import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsService } from '@/Engine/Physics';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
  physicsService: TPhysicsService;
}>;
