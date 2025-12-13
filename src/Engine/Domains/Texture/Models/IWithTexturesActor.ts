import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from './IMaterialTexturePack';
import type {
  IBasicMaterialTextureUploaded,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTextureUploaded,
  ILambertMaterialTextureUploaded,
  IMatcapMaterialTextureUploaded,
  INormalMaterialTextureUploaded,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTextureUploaded,
  IToonMaterialTextureUploaded
} from './IMaterialTextureUploaded';

export type IWithBasicTexturesActor = {
  useTextureAsMaterial: (mt: IBasicMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IBasicMaterialTexturePack) => Promise<void>;
};

export type IWithDepthTexturesActor = {
  useTextureAsMaterial: (mt: IDepthMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IDepthMaterialTexturePack) => Promise<void>;
};

export type IWithDistanceTexturesActor = {
  useTextureAsMaterial: (mt: IDistanceMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IDistanceMaterialTexturePack) => Promise<void>;
};

export type IWithNormalTexturesActor = {
  useTextureAsMaterial: (mt: INormalMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: INormalMaterialTexturePack) => Promise<void>;
};

export type IWithMatcapTexturesActor = {
  useTextureAsMaterial: (mt: IMatcapMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IMatcapMaterialTexturePack) => Promise<void>;
};

export type IWithLambertTexturesActor = {
  useTextureAsMaterial: (mt: ILambertMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: ILambertMaterialTexturePack) => Promise<void>;
};

export type IWithPhongTexturesActor = {
  useTextureAsMaterial: (mt: IPhongMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IPhongMaterialTexturePack) => Promise<void>;
};

export type IWithPhysicalTexturesActor = {
  useTextureAsMaterial: (mt: IPhysicalMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IPhysicalMaterialTexturePack) => Promise<void>;
};

export type IWithToonTexturesActor = {
  useTextureAsMaterial: (mt: IToonMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IToonMaterialTexturePack) => Promise<void>;
};

export type IWithStandardTexturesActor = {
  useTextureAsMaterial: (mt: IStandardMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IStandardMaterialTexturePack) => Promise<void>;
};

export type IWithTexturesActor =
  | IWithBasicTexturesActor
  | IWithDepthTexturesActor
  | IWithDistanceTexturesActor
  | IWithNormalTexturesActor
  | IWithMatcapTexturesActor
  | IWithLambertTexturesActor
  | IWithPhongTexturesActor
  | IWithPhysicalTexturesActor
  | IWithToonTexturesActor
  | IWithStandardTexturesActor;
