import type { TModel3dToActorConnectionRegistry } from '@/Engine/Actor';
import { ActorFactory, ActorRegistry, ActorService, Model3dToActorConnectionRegistry } from '@/Engine/Actor';
import type { TAnimationsService } from '@/Engine/Animations';
import { AnimationsResourceAsyncRegistry, AnimationsService } from '@/Engine/Animations';
import type { TAppCanvas } from '@/Engine/App';
import { AudioFactory, AudioListenersRegistry, AudioRegistry, AudioResourceAsyncRegistry, AudioService } from '@/Engine/Audio';
import type { TCameraService } from '@/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import type { TCollisionsService } from '@/Engine/Collisions';
import { CollisionsService } from '@/Engine/Collisions';
import { ambientContext } from '@/Engine/Context';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapFactory, EnvMapRegistry, EnvMapService, EnvMapTextureAsyncRegistry } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import type { TFsmService } from '@/Engine/Fsm';
import { FsmInstanceFactory, FsmInstanceRegistry, FsmSourceRegistry } from '@/Engine/Fsm';
import { FsmSourceFactory } from '@/Engine/Fsm/Factories/FsmSourceFactory';
import { FsmService } from '@/Engine/Fsm/Services/FsmService';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Engine/Intersections';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { TLoopService } from '@/Engine/Loop';
import { LoopFactory, LoopRegistry, LoopService } from '@/Engine/Loop';
import type { TMaterialService } from '@/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Engine/Material';
import type { TModel3dRawToModel3dConnectionRegistry, TModels3dService } from '@/Engine/Models3d';
import { Model3dRawToModel3dConnectionRegistry, Models3dFactory, Models3dRegistry, Models3dResourceAsyncRegistry, Models3dService } from '@/Engine/Models3d';
import { MouseService } from '@/Engine/Mouse';
import { ParticlesFactory, ParticlesRegistry, ParticlesService } from '@/Engine/Particles';
import type { TPhysicsBodyService, TPhysicsPresetsService, TPhysicsWorldService } from '@/Engine/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsPresetRegistry, PhysicsPresetsService, PhysicsWorldService } from '@/Engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { TSceneConfig, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { TSpaceBaseServices, TSpaceLoops, TSpaceServices } from '@/Engine/Space/Models';
import type { TSpatialGridService } from '@/Engine/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService } from '@/Engine/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, Text3dTextureRegistry, TextFactory, TextService } from '@/Engine/Text';
import type { TTextureService } from '@/Engine/Texture';
import { TextureService } from '@/Engine/Texture';
import { TextureAsyncRegistry } from '@/Engine/Texture/Registries/TextureAsyncRegistry';
import { isNotDefined } from '@/Engine/Utils';

export function getActiveScene(spaceName: string, scenes: ReadonlyArray<TSceneConfig>, scenesService: TScenesService): TSceneWrapper {
  scenesService.createFromConfig(scenes);
  const sceneW: TSceneWrapper | undefined = scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${spaceName}" during space's services initialization.`);
  const activeSceneW: TSceneWrapper = sceneW;

  // TODO debug (window as any).sceneW
  // (window as any).sceneW = sceneW;

  return activeSceneW;
}

export function buildBaseServices(): TSpaceBaseServices {
  const scenesService: TScenesService = ScenesService(SceneFactory(), SceneRegistry());
  const loopService: TLoopService = LoopService(LoopFactory(), LoopRegistry());
  return { loopService, scenesService };
}

// TODO 10.0.0: Loops: check if loopService is redundant
export function buildEntitiesServices(sceneW: TSceneWrapper, canvas: TAppCanvas, loops: TSpaceLoops, { loopService, scenesService }: TSpaceBaseServices): TSpaceServices {
  const textureService: TTextureService = TextureService(TextureAsyncRegistry());
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry(), { textureService });
  const physicsPresetService: TPhysicsPresetsService = PhysicsPresetsService(PhysicsPresetRegistry());
  const physicsWorldService: TPhysicsWorldService = PhysicsWorldService(sceneW, loops);
  const physicsBodyService: TPhysicsBodyService = PhysicsBodyService(PhysicsBodyFactory(), PhysicsBodyRegistry(), physicsPresetService, physicsWorldService);
  const spatialGridService: TSpatialGridService = SpatialGridService(SpatialGridFactory(), SpatialGridRegistry());
  const collisionsService: TCollisionsService = CollisionsService();
  const animationsService: TAnimationsService = AnimationsService(AnimationsResourceAsyncRegistry(), loops);
  const model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry = Model3dToActorConnectionRegistry();
  const model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry = Model3dRawToModel3dConnectionRegistry();
  const models3dService: TModels3dService = Models3dService(Models3dFactory(), Models3dRegistry(), Models3dResourceAsyncRegistry(), {
    materialService,
    animationsService,
    model3dRawToModel3dConnectionRegistry
  });
  const fsmService: TFsmService = FsmService(FsmInstanceFactory(), FsmSourceFactory(), FsmInstanceRegistry(), FsmSourceRegistry());
  const cameraService: TCameraService = CameraService(CameraFactory(), CameraRegistry(), sceneW);

  return {
    actorService: ActorService(
      ActorFactory(),
      ActorRegistry(),
      {
        models3dService,
        physicsBodyService,
        spatialGridService,
        collisionsService,
        model3dToActorConnectionRegistry,
        fsmService,
        loopService
      },
      sceneW
    ),
    audioService: AudioService(AudioFactory(), AudioRegistry(), AudioResourceAsyncRegistry(), AudioListenersRegistry(), loops),
    cameraService,
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), loops, canvas),
    collisionsService,
    scenesService,
    envMapService: EnvMapService(EnvMapFactory(), EnvMapRegistry(), EnvMapTextureAsyncRegistry(), sceneW),
    fogService: FogService(FogFactory(), FogRegistry(), sceneW),
    fsmService,
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    lightService: LightService(LightFactory(), LightRegistry(), sceneW),
    loopService,
    materialService,
    models3dService,
    animationsService,
    mouseService: MouseService(ambientContext.container, loops),
    particlesService: ParticlesService(ParticlesFactory(), ParticlesRegistry(), materialService, sceneW),
    physicsBodyService,
    physicsWorldService,
    physicsPresetService,
    rendererService: RendererService(RendererFactory(), RendererRegistry(), loops, { cameraService }, sceneW),
    spatialGridService,
    textService: TextService(
      TextFactory(),
      Text2dRegistry(),
      Text3dRegistry(),
      Text3dTextureRegistry(),
      Text2dRendererRegistry(),
      Text3dRendererRegistry(),
      loops,
      { loopService, physicsBodyService, cameraService },
      sceneW
    ),
    textureService
  };
}
