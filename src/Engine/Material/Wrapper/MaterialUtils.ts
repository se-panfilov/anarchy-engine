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

import type { IMaterialParams, IMaterialProps, ITypeOfMaterials, MaterialType } from '@/Engine/Material';
import { BlendingMap, MaterialMap } from '@/Engine/Material/Constants';
import type { IMaterialTexturePack } from '@/Engine/Texture';
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

export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded): MeshBasicMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded): MeshDepthMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded): MeshDistanceMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded): MeshNormalMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded): MeshMatcapMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded): MeshLambertMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded): MeshPhongMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded): MeshPhysicalMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded): MeshToonMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded): MeshStandardMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPointsTextureUploaded): PointsMaterial;
export function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: ITextureUploaded): Material {
  if (isDefined(params?.blending)) params = { ...params, blending: BlendingMap[params.blending] };

  const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
  if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
  // TODO (S.Panfilov) CWP blending type doesn't match. We should either leave it a number, split IMaterialParams and create IMaterialConfig
  return new MaterialConstructor({ ...textures, ...params });
}

export async function buildMaterialWithTextures(material: IMaterialParams<IMaterialTexturePack>): Promise<Material> {
  let textures;
  if (isDefined(material.textures)) textures = await textureService.load(material).all();
  return buildMaterial(material.type, material.params, textures);
}
