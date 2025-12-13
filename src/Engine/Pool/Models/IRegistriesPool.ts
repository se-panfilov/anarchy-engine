import type { IActorRegistry, ICameraRegistry, IControlsRegistry, ILightRegistry } from '@Engine/Registries';

export type IRegistriesPool = Readonly<{
  actorRegistry: IActorRegistry;
  cameraRegistry: ICameraRegistry;
  lightRegistry: ILightRegistry;
  controlsRegistry: IControlsRegistry;
}>;
