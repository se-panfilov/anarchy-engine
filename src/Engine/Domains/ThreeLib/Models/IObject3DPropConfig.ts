import type { IObject3DPropParams } from './IObject3DPropParams';

export type IObject3DPropConfig = Omit<IObject3DPropParams, 'layers' | 'animations'> & Readonly<{
  layers?: number;
  animations?: ReadonlyArray<string>;
}>;
