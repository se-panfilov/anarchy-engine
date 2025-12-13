import type { IFogWrapper } from './IFogWrapper';

export type IFogService = Readonly<{
  createFog: () => IFogWrapper;
}>;
