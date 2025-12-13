import type { IControlsFactory } from '@Engine/Factories';

export type ISceneFactories = Readonly<{
  controlsFactory: IControlsFactory;
}>;
