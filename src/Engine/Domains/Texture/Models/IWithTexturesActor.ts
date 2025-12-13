import type {
  Material,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial
} from 'three';

import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialTexturePack,
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
import type {
  IBasicMaterialTextureUploadPromises,
  IDepthMaterialTextureUploadPromises,
  IDistanceMaterialTextureUploadPromises,
  ILambertMaterialTextureUploadPromises,
  IMatcapMaterialTextureUploadPromises,
  INormalMaterialTextureUploadPromises,
  IPhongMaterialTextureUploadPromises,
  IPhysicalMaterialTextureUploadPromises,
  IStandardMaterialTextureUploadPromises,
  IToonMaterialTextureUploadPromises
} from './IMaterialTextureUploadPromises.ts';

export type IWithBasicTexturesActor = {
  getTexturedMaterial: (mt: IBasicMaterialTextureUploaded) => MeshBasicMaterial;
  loadMaterialTexturePack: (pack: IBasicMaterialTexturePack) => IBasicMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithDepthTexturesActor = {
  getTexturedMaterial: (mt: IDepthMaterialTextureUploaded) => MeshDepthMaterial;
  loadMaterialTexturePack: (pack: IDepthMaterialTexturePack) => IDepthMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithDistanceTexturesActor = {
  getTexturedMaterial: (mt: IDistanceMaterialTextureUploaded) => MeshDistanceMaterial;
  loadMaterialTexturePack: (pack: IDistanceMaterialTexturePack) => IDistanceMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithNormalTexturesActor = {
  getTexturedMaterial: (mt: INormalMaterialTextureUploaded) => MeshNormalMaterial;
  loadMaterialTexturePack: (pack: INormalMaterialTexturePack) => INormalMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithMatcapTexturesActor = {
  getTexturedMaterial: (mt: IMatcapMaterialTextureUploaded) => MeshMatcapMaterial;
  loadMaterialTexturePack: (pack: IMatcapMaterialTexturePack) => IMatcapMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithLambertTexturesActor = {
  getTexturedMaterial: (mt: ILambertMaterialTextureUploaded) => MeshLambertMaterial;
  loadMaterialTexturePack: (pack: ILambertMaterialTexturePack) => ILambertMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithPhongTexturesActor = {
  getTexturedMaterial: (mt: IPhongMaterialTextureUploaded) => MeshPhongMaterial;
  loadMaterialTexturePack: (pack: IPhongMaterialTexturePack) => IPhongMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithPhysicalTexturesActor = {
  getTexturedMaterial: (mt: IPhysicalMaterialTextureUploaded) => MeshPhysicalMaterial;
  loadMaterialTexturePack: (pack: IPhysicalMaterialTexturePack) => IPhysicalMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithToonTexturesActor = {
  getTexturedMaterial: (mt: IToonMaterialTextureUploaded) => MeshToonMaterial;
  loadMaterialTexturePack: (pack: IToonMaterialTexturePack) => IToonMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
};

export type IWithStandardTexturesActor = {
  getTexturedMaterial: (mt: IStandardMaterialTextureUploaded) => MeshStandardMaterial;
  loadMaterialTexturePack: (pack: IStandardMaterialTexturePack) => IStandardMaterialTextureUploadPromises;
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
  useMaterial: (material: Material) => void;
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
