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

import type { IMaterialParams, ITypeOfMaterials, MaterialType } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material';
import type { IMaterialService } from '@/Engine/Material/Models';
import type {
  IBasicTextureUploaded,
  IDepthTextureUploaded,
  IDistanceTextureUploaded,
  ILambertTextureUploaded,
  IMatcapTextureUploaded,
  INormalTextureUploaded,
  IPhongTextureUploaded,
  IPhysicalTextureUploaded,
  IStandardTextureUploaded,
  ITextureUploaded,
  IToonTextureUploaded
} from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

export function MaterialService(): IMaterialService {
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IBasicTextureUploaded): MeshBasicMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IDepthTextureUploaded): MeshDepthMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IDistanceTextureUploaded): MeshDistanceMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: INormalTextureUploaded): MeshNormalMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IMatcapTextureUploaded): MeshMatcapMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: ILambertTextureUploaded): MeshLambertMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPhongTextureUploaded): MeshPhongMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPhysicalTextureUploaded): MeshPhysicalMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IToonTextureUploaded): MeshToonMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IStandardTextureUploaded): MeshStandardMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: ITextureUploaded): Material {
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
    return new MaterialConstructor({ ...textures, ...params });
  }

  return { buildMaterial };
}

export const materialService: IMaterialService = MaterialService();
