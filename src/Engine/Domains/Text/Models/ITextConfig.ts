import type { IWithCoordsXYZ } from '@/Engine/Mixins';

import type { ITextParams } from './ITextParams';

export type ITextConfig = Omit<ITextParams, 'position' | 'color' | 'strokeColor' | 'material'> &
  Readonly<{
    position: IWithCoordsXYZ;
    rotation?: IWithCoordsXYZ;
    color?: string;
    strokeColor?: string | number;
    materialType?: 'MeshBasicMaterial' | 'MeshStandardMaterial';
    materialParams?: Record<string, any>; // MeshBasicMaterialParameters | MeshStandardMaterialParameters;
  }>;
