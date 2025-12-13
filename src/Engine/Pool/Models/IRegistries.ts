import type { IActorRegistry } from '@Engine/Domains/Actor';
import type { ICameraRegistry } from '@Engine/Domains/Camera';
import type { IControlsRegistry } from '@Engine/Domains/Controls';
import type { IIntersectionsWatcherRegistry } from '@Engine/Domains/Intersections';
import type { ILightRegistry } from '@Engine/Domains/Light';
import type { IMouseClicksWatcherRegistry, IMousePositionWatcherRegistry } from '@Engine/Domains/Mouse';
import type { IScreenSizeWatcherRegistry } from '@Engine/Domains/Screen';

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
