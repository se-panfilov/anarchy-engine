import type { TKinematicLoopService } from '@/Engine/Kinematic';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack/Models';
import type { TPhysicsBodyService, TPhysicsLoopService } from '@/Engine/Physics';
import type { TSpatialGridService, TSpatialLoopService } from '@/Engine/Spatial/Models';

export type TActorDependencies = Readonly<{
  materialTextureService: TMaterialTextureService;
  kinematicLoopService: TKinematicLoopService;
  spatialLoopService: TSpatialLoopService;
  spatialGridService: TSpatialGridService;
}>;

export type TActorWithPhysicsDependencies = TActorDependencies &
  Readonly<{
    physicsBodyService: TPhysicsBodyService;
    physicsLoopService: TPhysicsLoopService;
  }>;

export type TActorServiceDependencies = TActorDependencies & TActorWithPhysicsDependencies;
