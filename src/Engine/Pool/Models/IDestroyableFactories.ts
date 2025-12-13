import type { IControlsFactory } from '@Engine/Domains/Controls';

export type IDestroyableFactories = Readonly<{
  controlsFactory: IControlsFactory;
}>;
