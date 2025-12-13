import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { IEuler3dConfig } from './IEuler3dConfig';
import type { IObject3DParams } from './IObject3DParams';

export type IObject3DPropConfig = Omit<IObject3DParams, 'layers' | 'animations' | 'position' | 'rotation' | 'scale'> & Readonly<{
  layers?: number;
  animations?: ReadonlyArray<string>;
  position: IWithCoordsXYZ;
  rotation?: IEuler3dConfig;
  scale?: IWithCoordsXYZ;
}>;
