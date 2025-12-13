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
  function buildMaterial(type: MaterialType, textures: IBasicTextureUploaded): MeshBasicMaterial;
  function buildMaterial(type: MaterialType, textures: IDepthTextureUploaded): MeshDepthMaterial;
  function buildMaterial(type: MaterialType, textures: IDistanceTextureUploaded): MeshDistanceMaterial;
  function buildMaterial(type: MaterialType, textures: INormalTextureUploaded): MeshNormalMaterial;
  function buildMaterial(type: MaterialType, textures: IMatcapTextureUploaded): MeshMatcapMaterial;
  function buildMaterial(type: MaterialType, textures: ILambertTextureUploaded): MeshLambertMaterial;
  function buildMaterial(type: MaterialType, textures: IPhongTextureUploaded): MeshPhongMaterial;
  function buildMaterial(type: MaterialType, textures: IPhysicalTextureUploaded): MeshPhysicalMaterial;
  function buildMaterial(type: MaterialType, textures: IToonTextureUploaded): MeshToonMaterial;
  function buildMaterial(type: MaterialType, textures: IStandardTextureUploaded): MeshStandardMaterial;
  function buildMaterial(type: MaterialType, textures: ITextureUploaded): Material {
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
    return new MaterialConstructor(textures);
  }

  return { buildMaterial };
}

export const materialService: IMaterialService = MaterialService();
