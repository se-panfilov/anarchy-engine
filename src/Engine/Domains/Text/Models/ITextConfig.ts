import type { TextTag } from '@/Engine/Domains/Text/Constants';
import type { IObject3DPropConfig } from '@/Engine/Domains/ThreeLib';
import type { IWithCoordsXYZ, IWithReadonlyTags } from '@/Engine/Mixins';

import type { ITextProps } from './ITextProps';

export type ITextConfig = Omit<ITextProps, 'position' | 'color' | 'strokeColor' | 'material'> &
  Readonly<{
    position: IWithCoordsXYZ;
    rotation?: IWithCoordsXYZ;
    color?: string;
    strokeColor?: string | number;
    materialType?: 'MeshBasicMaterial' | 'MeshStandardMaterial';
    materialParams?: Record<string, any>; // MeshBasicMaterialParameters | MeshStandardMaterialParameters;
  }> & IObject3DPropConfig & IWithReadonlyTags<TextTag>
