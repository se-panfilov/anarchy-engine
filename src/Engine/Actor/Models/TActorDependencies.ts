import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
}>;

export type TActorWithPhysicsDependencies = TActorDependencies &
  Readonly<{
    physicsBodyService: TPhysicsBodyService;
  }>;

export type TActorServiceDependencies = TActorDependencies & TActorWithPhysicsDependencies;
