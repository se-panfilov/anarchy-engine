import type { TModel3dToActorConnectionRegistry } from '@/Actor';
import { ActorFactory, ActorRegistry, ActorService, Model3dToActorConnectionRegistry } from '@/Actor';
import type { TAnimationsService } from '@/Animations';
import { AnimationsMetaInfoRegistry, AnimationsResourceAsyncRegistry, AnimationsService } from '@/Animations';
import type { TAudioService } from '@/Audio';
import { AudioFactory, AudioListenersRegistry, AudioRegistry, AudioResourceAsyncRegistry, AudioService } from '@/Audio';
import { AudioMetaInfoRegistry } from '@/Audio/Registries/AudioMetaInfoRegistry';
import type { TCameraService } from '@/Camera';
import { CameraFactory, CameraRegistry, CameraService } from '@/Camera';
import type { TCollisionsService } from '@/Collisions';
import { CollisionsService } from '@/Collisions';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Controls';
import { EnvMapFactory, EnvMapRegistry, EnvMapService, EnvMapTextureAsyncRegistry } from '@/EnvMap';
import { EnvMapMetaInfoRegistry } from '@/EnvMap/Registries/EnvMapMetaInfoRegistry';
import { FogFactory, FogRegistry, FogService } from '@/Fog';
import type { TFsmService } from '@/Fsm';
import { FsmInstanceFactory, FsmInstanceRegistry, FsmSourceRegistry } from '@/Fsm';
import { FsmSourceFactory } from '@/Fsm/Factories/FsmSourceFactory';
import { FsmService } from '@/Fsm/Services/FsmService';
import type { TContainerDecorator } from '@/Global';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Intersections';
import { KeyboardService } from '@/Keyboard';
import { LightFactory, LightRegistry, LightService } from '@/Light';
import type { TLoopService } from '@/Loop';
import { LoopFactory, LoopRegistry, LoopService } from '@/Loop';
import type { TMaterialService } from '@/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Material';
import type { TModel3dRawToModel3dConnectionRegistry, TModels3dService } from '@/Models3d';
import { Model3dRawToModel3dConnectionRegistry, Models3dFactory, Models3dMetaInfoRegistry, Models3dRegistry, Models3dResourceAsyncRegistry, Models3dService } from '@/Models3d';
import { MouseClickWatcherFactory, MouseClickWatcherRegistry, MousePositionWatcherFactory, MousePositionWatcherRegistry, MouseService } from '@/Mouse';
import { ParticlesFactory, ParticlesRegistry, ParticlesService } from '@/Particles';
import type { TPhysicsBodyService, TPhysicsWorldService } from '@/Physics';
import { PhysicsBodyFactory, PhysicsBodyRegistry, PhysicsBodyService, PhysicsWorldService } from '@/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@/Renderer';
import type { TScenesService, TSceneWrapper } from '@/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Scene';
import type { TSpaceCanvas } from '@/Space';
import type { TSpaceBaseServices, TSpaceLoops, TSpaceServices } from '@/Space/Models';
import type { TSpatialGridService } from '@/Spatial';
import { SpatialGridFactory, SpatialGridRegistry, SpatialGridService } from '@/Spatial';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, Text3dTextureRegistry, TextFactory, TextService } from '@/Text';
import type { TTextureService } from '@/Texture';
import { TextureMetaInfoRegistry, TextureResourceAsyncRegistry, TextureService } from '@/Texture';
import type { TTransformDriveService } from '@/TransformDrive';
import { TransformDriveFactory, TransformDriveRegistry, TransformDriveService } from '@/TransformDrive';

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
  { loopService, scenesService }: TSpaceBaseServices
): TSpaceServices {
  const textureService: TTextureService = TextureService(TextureResourceAsyncRegistry(), TextureMetaInfoRegistry());
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry(), { textureService });
  const physicsWorldService: TPhysicsWorldService = PhysicsWorldService(sceneW, loops);
  const physicsBodyService: TPhysicsBodyService = PhysicsBodyService(PhysicsBodyFactory(), PhysicsBodyRegistry(), physicsWorldService);
  const spatialGridService: TSpatialGridService = SpatialGridService(SpatialGridFactory(), SpatialGridRegistry());
  const collisionsService: TCollisionsService = CollisionsService();
  const animationsService: TAnimationsService = AnimationsService(AnimationsResourceAsyncRegistry(), AnimationsMetaInfoRegistry(), loops);
  const model3dToActorConnectionRegistry: TModel3dToActorConnectionRegistry = Model3dToActorConnectionRegistry();
  const model3dRawToModel3dConnectionRegistry: TModel3dRawToModel3dConnectionRegistry = Model3dRawToModel3dConnectionRegistry();
  const models3dService: TModels3dService = Models3dService(Models3dFactory(), Models3dRegistry(), Models3dResourceAsyncRegistry(), Models3dMetaInfoRegistry(), {
    materialService,
    animationsService,
    model3dRawToModel3dConnectionRegistry
  });
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
    keyboardService: KeyboardService(loops.keyboardLoop),
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
