import type { IActorRegistry, ICameraRegistry, IControlsRegistry, ILightRegistry, IMouseClicksWatcherRegistry, IScreenSizeWatcherRegistry } from '@Engine/Registries';
import { MousePositionWatcherFactory } from '@Engine/Factories';

export type IRegistries = Readonly<{
  actorRegistry: IActorRegistry;
  cameraRegistry: ICameraRegistry;
  lightRegistry: ILightRegistry;
  controlsRegistry: IControlsRegistry;
  mouseClicksWatcherRegistry: IMouseClicksWatcherRegistry;
  screenSizeWatcherRegistry: IScreenSizeWatcherRegistry;
  mousePositionWatcherRegistry: IMousePositionWatcherRegistry;
}>;
