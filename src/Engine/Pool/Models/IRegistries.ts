import type { IActorRegistry, ICameraRegistry, IControlsRegistry, ILightRegistry } from '@Engine/Registries';

export type IRegistries = Readonly<{
  actorRegistry: IActorRegistry;
  cameraRegistry: ICameraRegistry;
  lightRegistry: ILightRegistry;
  controlsRegistry: IControlsRegistry;
}>;
