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
  MeshToonMaterial,
  PointsMaterial
} from 'three';

import type { IMaterialParams, ITypeOfMaterials, MaterialType } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material/Constants';
import type { IMaterialPackProps, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import { textureService } from '@/Engine/Texture';
import type {
  IBasicTextureUploaded,
  IDepthTextureUploaded,
  IDistanceTextureUploaded,
  ILambertTextureUploaded,
  IMatcapTextureUploaded,
  INormalTextureUploaded,
  IPhongTextureUploaded,
  IPhysicalTextureUploaded,
  IPointsTextureUploaded,
  IStandardTextureUploaded,
  ITextureUploaded,
  IToonTextureUploaded
} from '@/Engine/Texture/Models';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded): MeshBasicMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded): MeshDepthMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded): MeshDistanceMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded): MeshNormalMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded): MeshMatcapMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded): MeshLambertMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded): MeshPhongMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded): MeshPhysicalMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded): MeshToonMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded): MeshStandardMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: IPointsTextureUploaded): PointsMaterial;
export function buildMaterialWithTextures(type: MaterialType, params?: IMaterialParams, textures?: ITextureUploaded): Material {
  const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  return new MaterialConstructor({ ...textures, ...params });
}

export async function buildMaterialTexturesPack(material: IMaterialPackProps<IMaterialTexturePack>): Promise<Material> {
  let textures;
  if (isDefined(material.textures)) textures = await textureService.load(material).all();
  return buildMaterialWithTextures(material.type, material.params, textures);
}
