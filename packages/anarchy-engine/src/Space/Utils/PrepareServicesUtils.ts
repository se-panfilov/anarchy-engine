import type { TModel3dToActorConnectionRegistry } from '@hellpig/anarchy-engine/Actor';
import { ActorFactory, ActorRegistry, ActorService, Model3dToActorConnectionRegistry } from '@hellpig/anarchy-engine/Actor';
import type { TAnimationsService } from '@hellpig/anarchy-engine/Animations';
import { AnimationsMetaInfoRegistry, AnimationsResourceAsyncRegistry, AnimationsService } from '@hellpig/anarchy-engine/Animations';
import type { TAudioService } from '@hellpig/anarchy-engine/Audio';
import { AudioFactory, AudioListenersRegistry, AudioRegistry, AudioResourceAsyncRegistry, AudioService } from '@hellpig/anarchy-engine/Audio';
import { AudioMetaInfoRegistry } from '@hellpig/anarchy-engine/Audio/Registries/AudioMetaInfoRegistry';
import type { TCameraService } from '@hellpig/anarchy-engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@hellpig/anarchy-engine/Camera';
import type { TCollisionsService } from '@hellpig/anarchy-engine/Collisions';
import { CollisionsService } from '@hellpig/anarchy-engine/Collisions';
import { ControlService, ControlsFactory, ControlsRegistry } from '@hellpig/anarchy-engine/Controls';
import { EnvMapFactory, EnvMapRegistry, EnvMapService, EnvMapTextureAsyncRegistry } from '@hellpig/anarchy-engine/EnvMap';
import { EnvMapMetaInfoRegistry } from '@hellpig/anarchy-engine/EnvMap/Registries/EnvMapMetaInfoRegistry';
import { FogFactory, FogRegistry, FogService } from '@hellpig/anarchy-engine/Fog';
import type { TFsmService } from '@hellpig/anarchy-engine/Fsm';
import { FsmInstanceFactory, FsmInstanceRegistry, FsmSourceRegistry } from '@hellpig/anarchy-engine/Fsm';
import { FsmSourceFactory } from '@hellpig/anarchy-engine/Fsm/Factories/FsmSourceFactory';
import { FsmService } from '@hellpig/anarchy-engine/Fsm/Services/FsmService';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@hellpig/anarchy-engine/Intersections';
import { KeyboardService, KeyWatcherFactory, KeyWatcherRegistry } from '@hellpig/anarchy-engine/Keyboard';
import { LightFactory, LightRegistry, LightService } from '@hellpig/anarchy-engine/Light';
import type { TLoadingManagerService, TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import { DEFAULT_SPACE_LOADING_MANAGER_NAME, LoadingManagerFactory, LoadingManagerRegistry, LoadingManagerService } from '@hellpig/anarchy-engine/LoadingManager';
import type { TLoopService } from '@hellpig/anarchy-engine/Loop';
import { LoopFactory, LoopRegistry, LoopService } from '@hellpig/anarchy-engine/Loop';
import type { TMaterialService } from '@hellpig/anarchy-engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@hellpig/anarchy-engine/Material';
import type { TModel3dRawToModel3dConnectionRegistry, TModels3dService } from '@hellpig/anarchy-engine/Models3d';
import { Model3dRawToModel3dConnectionRegistry, Models3dFactory, Models3dMetaInfoRegistry, Models3dRegistry, Models3dResourceAsyncRegistry, Models3dService } from '@hellpig/anarchy-engine/Models3d';
import { MouseClickWatcherFactory, MouseClickWatcherRegistry, MousePositionWatcherFactory, MousePositionWatcherRegistry, MouseService } from '@hellpig/anarchy-engine/Mouse';
import { ParticlesFactory, ParticlesRegistry, ParticlesService } from '@hellpig/anarchy-engine/Particles';
import type { TPhysicsBodyService, TPhysicsWorldService } from '@hellpig/anarchy-engine/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsWorldService } from '@hellpig/anarchy-engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@hellpig/anarchy-engine/Renderer';
import type { TScenesService, TSceneWrapper } from '@hellpig/anarchy-engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@hellpig/anarchy-engine/Scene';
import type { TSpaceBaseServices, TSpaceCanvas, TSpaceLoops, TSpaceServices, TSpaceSettings } from '@hellpig/anarchy-engine/Space/Models';
import type { TSpatialGridService } from '@hellpig/anarchy-engine/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService } from '@hellpig/anarchy-engine/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, Text3dTextureRegistry, TextFactory, TextService } from '@hellpig/anarchy-engine/Text';
import type { TTextureService } from '@hellpig/anarchy-engine/Texture';
import { TextureMetaInfoRegistry, TextureResourceAsyncRegistry, TextureService } from '@hellpig/anarchy-engine/Texture';
import type { TTransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';
import { TransformDriveFactory, TransformDriveRegistry, TransformDriveService } from '@hellpig/anarchy-engine/TransformDrive';

export function buildBaseServices(): TSpaceBaseServices {
  const scenesService: TScenesService = ScenesService(SceneFactory(), SceneRegistry());
  const loopService: TLoopService = LoopService(LoopFactory(), LoopRegistry());

  return { loopService, scenesService };
}

export function buildEntitiesServices(
  sceneW: TSceneWrapper,
  canvas: TSpaceCanvas,
  container: TContainerDecorator,
  loops: TSpaceLoops,
  { loopService, scenesService }: TSpaceBaseServices,
  settings: TSpaceSettings
): TSpaceServices {
  const loadingManagerService: TLoadingManagerService = LoadingManagerService(LoadingManagerFactory(), LoadingManagerRegistry());
  const loadingManagerW: TLoadingManagerWrapper = loadingManagerService.create({ name: DEFAULT_SPACE_LOADING_MANAGER_NAME });

  const textureService: TTextureService = TextureService(TextureResourceAsyncRegistry(), TextureMetaInfoRegistry(), loadingManagerW);
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry(), { textureService });
  const physicsWorldService: TPhysicsWorldService = PhysicsWorldService(sceneW, loops);
  const physicsBodyService: TPhysicsBodyService = PhysicsBodyService(PhysicsBodyFactory(), PhysicsBodyRegistry(), physicsWorldService);
  const spatialGridService: TSpatialGridService = SpatialGridService(SpatialGridFactory(), SpatialGridRegistry());
  const collisionsService: TCollisionsService = CollisionsService();
  const animationsService: TAnimationsService = AnimationsService(AnimationsResourceAsyncRegistry(), AnimationsMetaInfoRegistry(), loops, loadingManagerW, settings);
  const model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry = Model3dToActorConnectionRegistry();
  const model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry = Model3dRawToModel3dConnectionRegistry();
  const models3dService: TModels3dService = Models3dService(
    Models3dFactory(),
    Models3dRegistry(),
    Models3dResourceAsyncRegistry(),
    Models3dMetaInfoRegistry(),
    {
      materialService,
      animationsService,
      model3dRawToModel3dConnectionRegistry
    },
    loadingManagerW,
    settings
  );
  const fsmService: TFsmService = FsmService(FsmInstanceFactory(), FsmSourceFactory(), FsmInstanceRegistry(), FsmSourceRegistry());
  const transformDriveService: TTransformDriveService = TransformDriveService(TransformDriveFactory(), TransformDriveRegistry(), { loopService });
  const audioService: TAudioService = AudioService(
    AudioFactory(),
    AudioRegistry(),
    AudioResourceAsyncRegistry(),
    AudioListenersRegistry(),
    AudioMetaInfoRegistry(),
    { transformDriveService },
    loops,
    loadingManagerW
  );
  const cameraService: TCameraService = CameraService(CameraFactory(), CameraRegistry(), sceneW, { audioService, transformDriveService, container });

  return {
    actorService: ActorService(
      ActorFactory(),
      ActorRegistry(),
      {
        collisionsService,
        fsmService,
        loopService,
        model3dToActorConnectionRegistry,
        models3dService,
        physicsBodyService,
        spatialGridService,
        transformDriveService
      },
      sceneW
    ),
    audioService,
    cameraService,
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), loops, { cameraService }, canvas),
    collisionsService,
    scenesService,
    envMapService: EnvMapService(EnvMapFactory(), EnvMapRegistry(), EnvMapTextureAsyncRegistry(), EnvMapMetaInfoRegistry(), sceneW, loadingManagerW),
    fogService: FogService(FogFactory(), FogRegistry(), sceneW),
    fsmService,
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    keyboardService: KeyboardService(container, KeyWatcherFactory(), KeyWatcherRegistry()),
    lightService: LightService(LightFactory(), LightRegistry(), { transformDriveService }, sceneW),
    loadingManagerService,
    loopService,
    materialService,
    models3dService,
    animationsService,
    mouseService: MouseService(container, MouseClickWatcherFactory(), MouseClickWatcherRegistry(), MousePositionWatcherFactory(), MousePositionWatcherRegistry(), loops),
    particlesService: ParticlesService(ParticlesFactory(), ParticlesRegistry(), { transformDriveService, materialService }, sceneW),
    physicsBodyService,
    physicsWorldService,
    rendererService: RendererService(RendererFactory(), RendererRegistry(), loops, { cameraService, container }, sceneW),
    spatialGridService,
    textService: TextService(
      TextFactory(),
      Text2dRegistry(),
      Text3dRegistry(),
      Text3dTextureRegistry(),
      Text2dRendererRegistry(),
      Text3dRendererRegistry(),
      loops,
      { loopService, physicsBodyService, cameraService, transformDriveService },
      sceneW
    ),
    textureService,
    transformDriveService
  };
}
