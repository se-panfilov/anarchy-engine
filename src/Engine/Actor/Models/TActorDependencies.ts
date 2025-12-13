import type { TLoopService } from '@/Engine/Loop';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsBodyService } from '@/Engine/Physics';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
}>;

export type TActorWithPhysicsDependencies = TActorDependencies &
  Readonly<{
    physicsBodyService: TPhysicsBodyService;
    loopService: TLoopService;
  }>;

export type TActorServiceDependencies = TActorDependencies & TActorWithPhysicsDependencies;
