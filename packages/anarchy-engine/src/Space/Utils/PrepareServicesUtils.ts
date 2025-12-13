import type { TModel3dToActorConnectionRegistry } from '@Anarchy/Engine/Actor';
import { ActorFactory, ActorRegistry, ActorService, Model3dToActorConnectionRegistry } from '@Anarchy/Engine/Actor';
import type { TAnimationsService } from '@Anarchy/Engine/Animations';
import { AnimationsMetaInfoRegistry, AnimationsResourceAsyncRegistry, AnimationsService } from '@Anarchy/Engine/Animations';
import type { TAudioService } from '@Anarchy/Engine/Audio';
import { AudioFactory, AudioListenersRegistry, AudioRegistry, AudioResourceAsyncRegistry, AudioService } from '@Anarchy/Engine/Audio';
import { AudioMetaInfoRegistry } from '@Anarchy/Engine/Audio/Registries/AudioMetaInfoRegistry';
import type { TCameraService } from '@Anarchy/Engine/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@Anarchy/Engine/Camera';
import type { TCollisionsService } from '@Anarchy/Engine/Collisions';
import { CollisionsService } from '@Anarchy/Engine/Collisions';
import { ControlService, ControlsFactory, ControlsRegistry } from '@Anarchy/Engine/Controls';
import { EnvMapFactory, EnvMapRegistry, EnvMapService, EnvMapTextureAsyncRegistry } from '@Anarchy/Engine/EnvMap';
import { EnvMapMetaInfoRegistry } from '@Anarchy/Engine/EnvMap/Registries/EnvMapMetaInfoRegistry';
import { FogFactory, FogRegistry, FogService } from '@Anarchy/Engine/Fog';
import type { TFsmService } from '@Anarchy/Engine/Fsm';
import { FsmInstanceFactory, FsmInstanceRegistry, FsmSourceRegistry } from '@Anarchy/Engine/Fsm';
import { FsmSourceFactory } from '@Anarchy/Engine/Fsm/Factories/FsmSourceFactory';
import { FsmService } from '@Anarchy/Engine/Fsm/Services/FsmService';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@Anarchy/Engine/Intersections';
import { KeyboardService, KeyboardWatcherFactory, KeyboardWatcherRegistry } from '@Anarchy/Engine/Keyboard';
import { LightFactory, LightRegistry, LightService } from '@Anarchy/Engine/Light';
import type { TLoopService } from '@Anarchy/Engine/Loop';
import { LoopFactory, LoopRegistry, LoopService } from '@Anarchy/Engine/Loop';
import type { TMaterialService } from '@Anarchy/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@Anarchy/Engine/Material';
import type { TModel3dRawToModel3dConnectionRegistry, TModels3dService } from '@Anarchy/Engine/Models3d';
import { Model3dRawToModel3dConnectionRegistry, Models3dFactory, Models3dMetaInfoRegistry, Models3dRegistry, Models3dResourceAsyncRegistry, Models3dService } from '@Anarchy/Engine/Models3d';
import { MouseClickWatcherFactory, MouseClickWatcherRegistry, MousePositionWatcherFactory, MousePositionWatcherRegistry, MouseService } from '@Anarchy/Engine/Mouse';
import { ParticlesFactory, ParticlesRegistry, ParticlesService } from '@Anarchy/Engine/Particles';
import type { TPhysicsBodyService, TPhysicsWorldService } from '@Anarchy/Engine/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsWorldService } from '@Anarchy/Engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@Anarchy/Engine/Renderer';
import type { TScenesService, TSceneWrapper } from '@Anarchy/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@Anarchy/Engine/Scene';
import type { TSpaceCanvas, TSpaceSettings } from '@Anarchy/Engine/Space';
import type { TSpaceBaseServices, TSpaceLoops, TSpaceServices } from '@Anarchy/Engine/Space/Models';
import type { TSpatialGridService } from '@Anarchy/Engine/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService } from '@Anarchy/Engine/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, Text3dTextureRegistry, TextFactory, TextService } from '@Anarchy/Engine/Text';
import type { TTextureService } from '@Anarchy/Engine/Texture';
import { TextureMetaInfoRegistry, TextureResourceAsyncRegistry, TextureService } from '@Anarchy/Engine/Texture';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';
import { TransformDriveFactory, TransformDriveRegistry, TransformDriveService } from '@Anarchy/Engine/TransformDrive';

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
  const textureService: TTextureService = TextureService(TextureResourceAsyncRegistry(), TextureMetaInfoRegistry());
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry(), { textureService });
  const physicsWorldService: TPhysicsWorldService = PhysicsWorldService(sceneW, loops);
  const physicsBodyService: TPhysicsBodyService = PhysicsBodyService(PhysicsBodyFactory(), PhysicsBodyRegistry(), physicsWorldService);
  const spatialGridService: TSpatialGridService = SpatialGridService(SpatialGridFactory(), SpatialGridRegistry());
  const collisionsService: TCollisionsService = CollisionsService();
  const animationsService: TAnimationsService = AnimationsService(AnimationsResourceAsyncRegistry(), AnimationsMetaInfoRegistry(), loops, settings);
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
    settings
  );
  const fsmService: TFsmService = FsmService(FsmInstanceFactory(), FsmSourceFactory(), FsmInstanceRegistry(), FsmSourceRegistry());
  const transformDriveService: TTransformDriveService = TransformDriveService(TransformDriveFactory(), TransformDriveRegistry(), { loopService });
  const audioService: TAudioService = AudioService(AudioFactory(), AudioRegistry(), AudioResourceAsyncRegistry(), AudioListenersRegistry(), AudioMetaInfoRegistry(), { transformDriveService }, loops);
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
    envMapService: EnvMapService(EnvMapFactory(), EnvMapRegistry(), EnvMapTextureAsyncRegistry(), EnvMapMetaInfoRegistry(), sceneW),
    fogService: FogService(FogFactory(), FogRegistry(), sceneW),
    fsmService,
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    keyboardService: KeyboardService(container, KeyboardWatcherFactory(), KeyboardWatcherRegistry(), loops),
    lightService: LightService(LightFactory(), LightRegistry(), { transformDriveService }, sceneW),
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
