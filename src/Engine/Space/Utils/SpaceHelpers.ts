import { ActorFactory, ActorRegistry, ActorService } from '@/Engine/Actor';
import type { TAnimationsService } from '@/Engine/Animations';
import { AnimationsService } from '@/Engine/Animations';
import type { TAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import type { TCollisionsLoopService, TCollisionsService } from '@/Engine/Collisions';
import { CollisionsLoopService, CollisionsService } from '@/Engine/Collisions';
import { ambientContext } from '@/Engine/Context';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapAsyncRegistry, EnvMapService } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Engine/Intersections';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import { KinematicLoopService } from '@/Engine/Kinematic';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { TLoopService } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { TMaterialService } from '@/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import { MaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TModels3dService } from '@/Engine/Models3d';
import { Models3dAsyncRegistry, Models3dService } from '@/Engine/Models3d';
import { MouseService } from '@/Engine/Mouse';
import { ParticlesAsyncRegistry, ParticlesFactory, ParticlesService } from '@/Engine/Particles';
import type { TPhysicsBodyService, TPhysicsLoopService, TPhysicsPresetsService, TPhysicsWorldService } from '@/Engine/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsLoopService, PhysicsPresetRegistry, PhysicsPresetsService, PhysicsWorldService } from '@/Engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { TSceneFactory, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { TSpaceServices } from '@/Engine/Space/Models';
import type { TSpatialGridService, TSpatialLoopService } from '@/Engine/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService, SpatialLoopService } from '@/Engine/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, TextFactory, TextService } from '@/Engine/Text';
import { textureService } from '@/Engine/Texture';
import { isNotDefined } from '@/Engine/Utils';

export function initSceneService(): TScenesService {
  const sceneFactory: TSceneFactory = SceneFactory();
  const sceneRegistry: TSceneRegistry = SceneRegistry();

  return ScenesService(sceneFactory, sceneRegistry);
}

export function initEntitiesServices(sceneW: TSceneWrapper, canvas: TAppCanvas): Omit<TSpaceServices, 'scenesService'> {
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry());
  const materialTextureService: TMaterialTextureService = MaterialTextureService(materialService, textureService);
  const physicsPresetService: TPhysicsPresetsService = PhysicsPresetsService(PhysicsPresetRegistry());
  const physicsWorldService: TPhysicsWorldService = PhysicsWorldService(sceneW);
  const physicsBodyService: TPhysicsBodyService = PhysicsBodyService(PhysicsBodyFactory(), PhysicsBodyRegistry(), physicsPresetService, physicsWorldService);
  const physicsLoopService: TPhysicsLoopService = PhysicsLoopService(physicsWorldService);
  const kinematicLoopService: TKinematicLoopService = KinematicLoopService();
  const spatialLoopService: TSpatialLoopService = SpatialLoopService();
  const spatialGridService: TSpatialGridService = SpatialGridService(SpatialGridFactory(), SpatialGridRegistry());
  const collisionsLoopService: TCollisionsLoopService = CollisionsLoopService();
  const collisionsService: TCollisionsService = CollisionsService();
  const loopService: TLoopService = LoopService();
  const animationsService: TAnimationsService = AnimationsService(loopService);
  const models3dService: TModels3dService = Models3dService(Models3dAsyncRegistry(), animationsService, sceneW);

  return {
    actorService: ActorService(
      ActorFactory(),
      ActorRegistry(),
      {
        materialTextureService,
        models3dService,
        physicsBodyService,
        physicsLoopService,
        kinematicLoopService,
        spatialLoopService,
        spatialGridService,
        collisionsLoopService,
        collisionsService
      },
      sceneW
    ),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), sceneW),
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), canvas),
    collisionsService,
    collisionsLoopService,
    envMapService: EnvMapService(EnvMapAsyncRegistry()),
    fogService: FogService(FogFactory(), FogRegistry(), sceneW),
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    kinematicLoopService,
    lightService: LightService(LightFactory(), LightRegistry(), sceneW),
    loopService,
    materialService,
    materialTextureService,
    models3dService,
    animationsService,
    mouseService: MouseService(ambientContext.container, { loopService }),
    particlesService: ParticlesService(ParticlesFactory(), ParticlesAsyncRegistry(), materialTextureService, sceneW),
    physicsBodyService,
    physicsWorldService,
    physicsPresetService,
    physicsLoopService,
    rendererService: RendererService(RendererFactory(), RendererRegistry()),
    spatialLoopService,
    spatialGridService,
    textService: TextService(TextFactory(), Text2dRegistry(), Text3dRegistry(), Text2dRendererRegistry(), Text3dRendererRegistry(), sceneW)
  };
}

export function initServices(canvas: TAppCanvas, buildScenesFn: (scenesService: TScenesService) => TSceneWrapper): TSpaceServices | never {
  const scenesService: TScenesService = initSceneService();
  const sceneW: TSceneWrapper = buildScenesFn(scenesService);

  if (isNotDefined(sceneW)) throw new Error(`Cannot find the active scene for space during the services initialization.`);

  return {
    scenesService,
    ...initEntitiesServices(sceneW, canvas)
  };
}
