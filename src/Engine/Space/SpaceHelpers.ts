import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { TAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapService } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsWatcherFactory, IntersectionsWatcherRegistry, IntersectionsWatcherService } from '@/Engine/Intersections';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import type { IMaterialService } from '@/Engine/Material';
import { MaterialFactory, MaterialRegistry, MaterialService } from '@/Engine/Material';
import type { IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import { MaterialTextureService } from '@/Engine/MaterialTexturePack';
import { ParticlesAsyncRegistry, ParticlesFactory, ParticlesService } from '@/Engine/Particles';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { ISceneFactory, ISceneRegistry, TScenesService, TSceneWrapper } from '@/Engine/Scene';
import { SceneFactory, SceneRegistry, ScenesService } from '@/Engine/Scene';
import type { TSpaceServices } from '@/Engine/Space/Models';
import { Text2dRegistry, Text2dRendererRegistry, Text3dRegistry, Text3dRendererRegistry, TextFactory, TextService } from '@/Engine/Text';
import { textureService } from '@/Engine/Texture';
import { isNotDefined } from '@/Engine/Utils';

export function initSceneService(): TScenesService {
  const sceneFactory: ISceneFactory = SceneFactory();
  const sceneRegistry: ISceneRegistry = SceneRegistry();

  return ScenesService(sceneFactory, sceneRegistry);
}

export function initEntitiesServices(scene: TSceneWrapper, canvas: TAppCanvas): Omit<TSpaceServices, 'scenesService'> {
  const materialService: IMaterialService = MaterialService(MaterialFactory(), MaterialRegistry());
  const materialTextureService: IMaterialTextureService = MaterialTextureService(materialService, textureService);

  return {
    actorService: ActorService(ActorFactory(), ActorAsyncRegistry(), materialTextureService, scene),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), scene),
    lightService: LightService(LightFactory(), LightRegistry(), scene),
    fogService: FogService(FogFactory(), FogRegistry(), scene),
    envMapService: EnvMapService(),
    materialService,
    materialTextureService,
    particlesService: ParticlesService(ParticlesFactory(), ParticlesAsyncRegistry(), materialTextureService, scene),
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
