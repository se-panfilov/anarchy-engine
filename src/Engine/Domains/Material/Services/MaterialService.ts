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

import type { ITypeOfMaterials } from '@/Engine/Domains/Material';
import { MaterialMap } from '@/Engine/Domains/Material';
import type { IMaterialService } from '@/Engine/Domains/Material/Models';
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
} from '@/Engine/Domains/Texture/Models';
import { isNotDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

export function MaterialService(): IMaterialService {
  function buildMaterial(mt: IBasicMaterialTextureUploaded): MeshBasicMaterial;
  function buildMaterial(mt: IDepthMaterialTextureUploaded): MeshDepthMaterial;
  function buildMaterial(mt: IDistanceMaterialTextureUploaded): MeshDistanceMaterial;
  function buildMaterial(mt: INormalMaterialTextureUploaded): MeshNormalMaterial;
  function buildMaterial(mt: IMatcapMaterialTextureUploaded): MeshMatcapMaterial;
  function buildMaterial(mt: ILambertMaterialTextureUploaded): MeshLambertMaterial;
  function buildMaterial(mt: IPhongMaterialTextureUploaded): MeshPhongMaterial;
  function buildMaterial(mt: IPhysicalMaterialTextureUploaded): MeshPhysicalMaterial;
  function buildMaterial(mt: IToonMaterialTextureUploaded): MeshToonMaterial;
  function buildMaterial(mt: IStandardMaterialTextureUploaded): MeshStandardMaterial;
  function buildMaterial(mt: IMaterialTextureUploaded): Material {
    const params: Omit<IMaterialTextureUploaded, 'material'> = omitInObjectWithoutMutation(mt, 'material');
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[mt.material];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${mt.material}`);
    return new MaterialConstructor(params);
  }

  return { buildMaterial };
}

export const materialService: IMaterialService = MaterialService();
