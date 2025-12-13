import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { TAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapAsyncRegistry, EnvMapService } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Engine/Intersections';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { TMaterialService } from '@/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Engine/Material';
import type { TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import { MaterialTextureService } from '@/Engine/MaterialTexturePack';
import { ParticlesAsyncRegistry, ParticlesFactory, ParticlesService } from '@/Engine/Particles';
import type { TPhysicsBodyFacadeService, TPhysicsPresetsService } from '@/Engine/Physics';
import { PhysicsBodyFacadeFactory, PhysicsBodyFacadeRegistry, PhysicsBodyFacadeService, PhysicsPresetRegistry, PhysicsPresetsService } from '@/Engine/Physics';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { TSceneFactory, TSceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { TSpaceServices } from '@/Engine/Space/Models';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, TextFactory, TextService } from '@/Engine/Text';
import { textureService } from '@/Engine/Texture';
import { isNotDefined } from '@/Engine/Utils';

export function initSceneService(): TScenesService {
  const sceneFactory: TSceneFactory = SceneFactory();
  const sceneRegistry: TSceneRegistry = SceneRegistry();

  return ScenesService(sceneFactory, sceneRegistry);
}

export function initEntitiesServices(scene: TSceneWrapper, canvas: TAppCanvas): Omit<TSpaceServices, 'scenesService'> {
  const materialService: TMaterialService = MaterialService(MaterialFactory(), MaterialRegistry());
  const materialTextureService: TMaterialTextureService = MaterialTextureService(materialService, textureService);
  const physicsPresetService: TPhysicsPresetsService = PhysicsPresetsService(PhysicsPresetRegistry());
  const physicsBodyFacadeService: TPhysicsBodyFacadeService = PhysicsBodyFacadeService(PhysicsBodyFacadeFactory(), PhysicsBodyFacadeRegistry(), scene);

  return {
    actorService: ActorService(ActorFactory(), ActorAsyncRegistry(), { materialTextureService, physicsPresetService, physicsBodyFacadeService }, scene),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), scene),
    lightService: LightService(LightFactory(), LightRegistry(), scene),
    fogService: FogService(FogFactory(), FogRegistry(), scene),
    envMapService: EnvMapService(EnvMapAsyncRegistry()),
    materialService,
    materialTextureService,
    particlesService: ParticlesService(ParticlesFactory(), ParticlesAsyncRegistry(), materialTextureService, scene),
    physicsPresetService,
    physicsBodyFacadeService,
    rendererService: RendererService(RendererFactory(), RendererRegistry()),
    textService: TextService(TextFactory(), Text2dRegistry(), Text3dRegistry(), Text2dRendererRegistry(), Text3dRendererRegistry(), scene),
    intersectionsWatcherService: IntersectionsWatcherService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), canvas)
  };
}

export function initServices(canvas: TAppCanvas, buildScenesFn: (scenesService: TScenesService) => TSceneWrapper): TSpaceServices | never {
  const scenesService: TScenesService = initSceneService();
  const scene: TSceneWrapper = buildScenesFn(scenesService);

  if (isNotDefined(scene)) throw new Error(`Cannot find the active scene for space during the services initialization.`);

  return {
    scenesService,
    ...initEntitiesServices(scene, canvas)
  };
}
