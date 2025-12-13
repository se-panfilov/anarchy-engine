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

import type { ITypeOfMaterials, MaterialType } from '@/Engine/Material';
import { MaterialMap } from '@/Engine/Material';
import type { IMaterialService } from '@/Engine/Material/Models';
import type {
  IBasicMaterialTextureUploaded,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTextureUploaded,
  ILambertMaterialTextureUploaded,
  IMatcapMaterialTextureUploaded,
  IMaterialTextureUploaded,
  INormalMaterialTextureUploaded,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTextureUploaded,
  IToonMaterialTextureUploaded
} from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

export function MaterialService(): IMaterialService {
  function buildMaterial(type: MaterialType, textures: IBasicMaterialTextureUploaded): MeshBasicMaterial;
  function buildMaterial(type: MaterialType, textures: IDepthMaterialTextureUploaded): MeshDepthMaterial;
  function buildMaterial(type: MaterialType, textures: IDistanceMaterialTextureUploaded): MeshDistanceMaterial;
  function buildMaterial(type: MaterialType, textures: INormalMaterialTextureUploaded): MeshNormalMaterial;
  function buildMaterial(type: MaterialType, textures: IMatcapMaterialTextureUploaded): MeshMatcapMaterial;
  function buildMaterial(type: MaterialType, textures: ILambertMaterialTextureUploaded): MeshLambertMaterial;
  function buildMaterial(type: MaterialType, textures: IPhongMaterialTextureUploaded): MeshPhongMaterial;
  function buildMaterial(type: MaterialType, textures: IPhysicalMaterialTextureUploaded): MeshPhysicalMaterial;
  function buildMaterial(type: MaterialType, textures: IToonMaterialTextureUploaded): MeshToonMaterial;
  function buildMaterial(type: MaterialType, textures: IStandardMaterialTextureUploaded): MeshStandardMaterial;
  function buildMaterial(type: MaterialType, textures: IMaterialTextureUploaded): Material {
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
    return new MaterialConstructor(textures);
  }

  return { buildMaterial };
}

export const materialService: IMaterialService = MaterialService();
