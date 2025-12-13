import type { TModel3dFacadeToActorConnectionRegistry } from '@/Engine/Actor';
import { ActorFactory, ActorRegistry, ActorService, Model3dFacadeToActorConnectionRegistry } from '@/Engine/Actor';
import type { TAnimationsService } from '@/Engine/Animations';
import { AnimationsService } from '@/Engine/Animations';
import type { TAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import type { TCollisionsLoopService, TCollisionsService } from '@/Engine/Collisions';
import { CollisionsLoopService, CollisionsService } from '@/Engine/Collisions';
import { ambientContext } from '@/Engine/Context';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapFactory, EnvMapRegistry, EnvMapService, EnvMapTextureAsyncRegistry } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Engine/Intersections';
import type { TKinematicLoopService } from '@/Engine/Kinematic';
import { KinematicLoopService } from '@/Engine/Kinematic';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { TLoopService } from '@/Engine/Loop';
import { LoopService } from '@/Engine/Loop';
import type { TMaterialService } from '@/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Engine/Material';
import type { TModel3dToModel3dFacadeConnectionRegistry, TModels3dService } from '@/Engine/Models3d';
import { Model3dToModel3dFacadeConnectionRegistry, Models3dFactory, Models3dRegistry, Models3dResourceAsyncRegistry, Models3dService } from '@/Engine/Models3d';
import { MouseService } from '@/Engine/Mouse';
import { ParticlesFactory, ParticlesRegistry, ParticlesService } from '@/Engine/Particles';
import type { TPhysicsBodyService, TPhysicsLoopService, TPhysicsPresetsService, TPhysicsWorldService } from '@/Engine/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsLoopService, PhysicsPresetRegistry, PhysicsPresetsService, PhysicsWorldService } from '@/Engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { TSceneConfig, TSceneFactory, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { TSpaceServices } from '@/Engine/Space/Models';
import type { TSpatialGridService, TSpatialLoopService } from '@/Engine/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService, SpatialLoopService } from '@/Engine/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, Text3dTextureRegistry, TextFactory, TextService } from '@/Engine/Text';
import type { TTextureService } from '@/Engine/Texture';
import { TextureService } from '@/Engine/Texture';
import { TextureAsyncRegistry } from '@/Engine/Texture/Registries/TextureAsyncRegistry';
import { isNotDefined } from '@/Engine/Utils';

export async function prepareServices(spaceName: string, canvas: TAppCanvas, scenes: ReadonlyArray<TSceneConfig>): Promise<Readonly<{ services: TSpaceServices; activeSceneW: TSceneWrapper }>> {
  let activeSceneW: TSceneWrapper;
  const p = new Promise<{ services: TSpaceServices; activeSceneW: TSceneWrapper }>((resolve) => {
    const services: TSpaceServices = initServices(canvas, (scenesService: TScenesService): TSceneWrapper | never => {
      scenesService.createFromConfig(scenes);
      const sceneW: TSceneWrapper | undefined = scenesService.findActive();
      if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${spaceName}" during space's services initialization.`);
      activeSceneW = sceneW;

      // TODO debug (window as any).sceneW
      // (window as any).sceneW = sceneW;

      return activeSceneW;
    });

    resolve({ services, activeSceneW });
  });

  return p;
}

export function initSceneService(): TScenesService {
  const sceneFactory: TSceneFactory = SceneFactory();
  const sceneRegistry: TSceneRegistry = SceneRegistry();

  return ScenesService(sceneFactory, sceneRegistry);
}

export function initEntitiesServices(sceneW: TSceneWrapper, canvas: TAppCanvas): Omit<TSpaceServices, 'scenesService'> {
  const textureService: TTextureService = TextureService(TextureAsyncRegistry());
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry(), { textureService });
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
  const model3dFacadeToActorConnectionRegistry: TModel3dFacadeToActorConnectionRegistry = Model3dFacadeToActorConnectionRegistry();
  const model3dToModel3dFacadeConnectionRegistry: TModel3dToModel3dFacadeConnectionRegistry = Model3dToModel3dFacadeConnectionRegistry();
  const models3dService: TModels3dService = Models3dService(Models3dFactory(), Models3dRegistry(), Models3dResourceAsyncRegistry(), {
    materialService,
    animationsService,
    model3dToModel3dFacadeConnectionRegistry
  });

  return {
    actorService: ActorService(
      ActorFactory(),
      ActorRegistry(),
      {
        models3dService,
        physicsBodyService,
        physicsLoopService,
        kinematicLoopService,
        spatialLoopService,
        spatialGridService,
        collisionsLoopService,
        collisionsService,
        model3dFacadeToActorConnectionRegistry
      },
      sceneW
    ),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), sceneW),
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), canvas),
    collisionsService,
    collisionsLoopService,
    envMapService: EnvMapService(EnvMapFactory(), EnvMapRegistry(), EnvMapTextureAsyncRegistry(), sceneW),
    fogService: FogService(FogFactory(), FogRegistry(), sceneW),
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    kinematicLoopService,
    lightService: LightService(LightFactory(), LightRegistry(), sceneW),
    loopService,
    materialService,
    models3dService,
    animationsService,
    mouseService: MouseService(ambientContext.container, { loopService }),
    particlesService: ParticlesService(ParticlesFactory(), ParticlesRegistry(), materialService, sceneW),
    physicsBodyService,
    physicsWorldService,
    physicsPresetService,
    physicsLoopService,
    rendererService: RendererService(RendererFactory(), RendererRegistry()),
    spatialLoopService,
    spatialGridService,
    textService: TextService(TextFactory(), Text2dRegistry(), Text3dRegistry(), Text3dTextureRegistry(), Text2dRendererRegistry(), Text3dRendererRegistry(), sceneW),
    textureService
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
