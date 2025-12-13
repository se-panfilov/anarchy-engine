import type { IControlsFactory } from '@Engine/Factories';

export type IDestroyableFactories = Readonly<{
  controlsFactory: IControlsFactory;
}>;
