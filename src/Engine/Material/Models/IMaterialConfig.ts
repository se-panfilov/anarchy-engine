import type { BlendingName } from '@/Engine/Material/Constants';

import type {
  IAbstractMaterialProps,
  IBasicMaterialProps,
  IDepthMaterialProps,
  IDistanceMaterialProps,
  ILambertMaterialProps,
  IMatcapMaterialProps,
  IMaterialProps,
  INormalMaterialProps,
  IPhongMaterialProps,
  IPhysicalMaterialProps,
  IPointsMaterialProps,
  IStandardMaterialProps,
  IToonMaterialProps
} from './IMaterialProps';

export type IAbstractMaterialConfig = Omit<IAbstractMaterialProps, 'blending'> & IMaterialConfigFields;
export type IBasicMaterialConfig = Omit<IBasicMaterialProps, 'blending'> & IMaterialConfigFields;
export type IDepthMaterialConfig = Omit<IDepthMaterialProps, 'blending'> & IMaterialConfigFields;
export type IDistanceMaterialConfig = Omit<IDistanceMaterialProps, 'blending'> & IMaterialConfigFields;
export type INormalMaterialConfig = Omit<INormalMaterialProps, 'blending'> & IMaterialConfigFields;
export type IMatcapMaterialConfig = Omit<IMatcapMaterialProps, 'blending'> & IMaterialConfigFields;
export type ILambertMaterialConfig = Omit<ILambertMaterialProps, 'blending'> & IMaterialConfigFields;
export type IPhongMaterialConfig = Omit<IPhongMaterialProps, 'blending'> & IMaterialConfigFields;
export type IToonMaterialConfig = Omit<IToonMaterialProps, 'blending'> & IMaterialConfigFields;
export type IStandardMaterialConfig = Omit<IStandardMaterialProps, 'blending'> & IMaterialConfigFields;
export type IPhysicalMaterialConfig = Omit<IPhysicalMaterialProps, 'blending'> & IMaterialConfigFields;
export type IPointsMaterialConfig = Omit<IPointsMaterialProps, 'blending'> & IMaterialConfigFields;
export type IMaterialConfig = IMaterialProps;

export type IMaterialConfigFields = {
  blending?: BlendingName;
};
