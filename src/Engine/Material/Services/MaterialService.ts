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
import { MaterialMap } from '@/Engine/Material';
import type { IMaterialService } from '@/Engine/Material/Models';
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
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: IPointsTextureUploaded): PointsMaterial;
  function buildMaterial(type: MaterialType, params?: IMaterialParams, textures?: ITextureUploaded): Material {
    // TODO (S.Panfilov) fix applying of blending
    // params = {...params, blending: undefined};

    const MaterialConstructor: ITypeOfMaterials = MaterialMap[type];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${type}`);
    return new MaterialConstructor({ ...textures, ...params });
  }

  async function buildMaterialWithTextures(material: IMaterialProps<IMaterialTexturePack>): Promise<Material> {
    let textures;
    if (isDefined(material.textures)) textures = await textureService.load(material).all();
    return buildMaterial(material.type, material.params, textures);
  }

  return { buildMaterial, buildMaterialWithTextures };
}

export const materialService: IMaterialService = MaterialService();
