import type { IActorRegistry, ICameraRegistry, IControlsRegistry, ILightRegistry, IMouseClicksWatcherRegistry, IScreenSizeWatcherRegistry, IMousePositionWatcherRegistry } from '@Engine/Registries';

export type IRegistries = Readonly<{
  actorRegistry: IActorRegistry;
  cameraRegistry: ICameraRegistry;
  lightRegistry: ILightRegistry;
  controlsRegistry: IControlsRegistry;
  mouseClicksWatcherRegistry: IMouseClicksWatcherRegistry;
  screenSizeWatcherRegistry: IScreenSizeWatcherRegistry;
  mousePositionWatcherRegistry: IMousePositionWatcherRegistry;
}>;
