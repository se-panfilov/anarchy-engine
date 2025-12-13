import type { IActorRegistry } from '@Engine/Domains/Actor';
import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IControlsRegistry } from '@Engine/Domains/Controls';
import type { ILightRegistry } from '@Engine/Domains/Light';
import type { IIntersectionsWatcherRegistry, IMouseClicksWatcherRegistry, IMousePositionWatcherRegistry, IScreenSizeWatcherRegistry } from '@Engine/Registries';

export type IRegistries = Readonly<{
  actorRegistry: IActorRegistry;
  cameraRegistry: ICameraRegistry;
  lightRegistry: ILightRegistry;
  controlsRegistry: IControlsRegistry;
  mouseClicksWatcherRegistry: IMouseClicksWatcherRegistry;
  screenSizeWatcherRegistry: IScreenSizeWatcherRegistry;
  mousePositionWatcherRegistry: IMousePositionWatcherRegistry;
  intersectionsWatcherRegistry: IIntersectionsWatcherRegistry;
}>;
