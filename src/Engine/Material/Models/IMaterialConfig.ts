import type { BlendingName } from '@/Engine/Material/Constants';

import type {
  IAbstractMaterialProps,
  IBasicMaterialProps,
  IDepthMaterialProps,
  IDistanceMaterialProps,
  ILambertMaterialProps,
  IMatcapMaterialProps,
  INormalMaterialProps,
  IPhongMaterialProps,
  IPhysicalMaterialProps,
  IPointsMaterialProps,
  IStandardMaterialProps,
  IToonMaterialProps
} from './IMaterialProps';
import type { IWithMaterialType } from './IWithMaterialType';

export type IAbstractMaterialConfig = Omit<IAbstractMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IBasicMaterialConfig = Omit<IBasicMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IDepthMaterialConfig = Omit<IDepthMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IDistanceMaterialConfig = Omit<IDistanceMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type INormalMaterialConfig = Omit<INormalMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IMatcapMaterialConfig = Omit<IMatcapMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type ILambertMaterialConfig = Omit<ILambertMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IPhongMaterialConfig = Omit<IPhongMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IToonMaterialConfig = Omit<IToonMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IStandardMaterialConfig = Omit<IStandardMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IPhysicalMaterialConfig = Omit<IPhysicalMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IPointsMaterialConfig = Omit<IPointsMaterialProps, 'blending'> & IWithMaterialType & IMaterialConfigFields;
export type IMaterialConfig =
  | IAbstractMaterialConfig
  | IBasicMaterialConfig
  | IDepthMaterialConfig
  | IDistanceMaterialConfig
  | INormalMaterialConfig
  | IMatcapMaterialConfig
  | ILambertMaterialConfig
  | IPhongMaterialConfig
  | IToonMaterialConfig
  | IStandardMaterialConfig
  | IPhysicalMaterialConfig
  | IPointsMaterialConfig;

export type IMaterialConfigFields = {
  blending?: BlendingName;
};
