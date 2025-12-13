import { ActorAsyncRegistry, ActorFactory, ActorService } from '@/Engine/Actor';
import type { IAppCanvas } from '@/Engine/App';
import { CameraFactory, CameraRegistry, CameraService } from '@/Engine/Camera';
import { ControlService, ControlsFactory, ControlsRegistry } from '@/Engine/Controls';
import { EnvMapService } from '@/Engine/EnvMap';
import { FogFactory, FogRegistry, FogService } from '@/Engine/Fog';
import { IntersectionsService, IntersectionsWatcherFactory, IntersectionsWatcherRegistry } from '@/Engine/Intersections';
import { LightFactory, LightRegistry, LightService } from '@/Engine/Light';
import { LoopService } from '@/Engine/Loop';
import { RendererFactory, RendererRegistry, RendererService } from '@/Engine/Renderer';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { ISpaceServices } from '@/Engine/Space/Models';
import { Text2dRegistry, Text3dRegistry, TextFactory, TextService } from '@/Engine/Text';

export function initSceneServices(scene: ISceneWrapper, canvas: IAppCanvas): Omit<ISpaceServices, 'scenesService'> {
  return {
    actorService: ActorService(ActorFactory(), ActorAsyncRegistry(), scene),
    cameraService: CameraService(CameraFactory(), CameraRegistry(), scene),
    lightService: LightService(LightFactory(), LightRegistry(), scene),
    fogService: FogService(FogFactory(), FogRegistry(), scene),
    envMapService: EnvMapService(),
    loopService: LoopService(),
    rendererService: RendererService(RendererFactory(), RendererRegistry()),
    textService: TextService(TextFactory(), Text2dRegistry(), Text3dRegistry(), scene),
    intersectionsService: IntersectionsService(IntersectionsWatcherFactory(), IntersectionsWatcherRegistry()),
    controlsService: ControlService(ControlsFactory(), ControlsRegistry(), canvas)
  };
}
