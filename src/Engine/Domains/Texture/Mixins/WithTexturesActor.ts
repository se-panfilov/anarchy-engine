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

import type { IMesh } from '@/Engine/Domains/Actor';
import type { ITypeOfMaterials } from '@/Engine/Domains/Material';
import { MaterialMap } from '@/Engine/Domains/Material';
import { textureService } from '@/Engine/Domains/Texture';
import type {
  IBasicMaterialTexturePack,
  IBasicMaterialTextureUploaded,
  IBasicMaterialTextureUploadPromises,
  IDepthMaterialTexturePack,
  IDepthMaterialTextureUploaded,
  IDepthMaterialTextureUploadPromises,
  IDistanceMaterialTexturePack,
  IDistanceMaterialTextureUploaded,
  IDistanceMaterialTextureUploadPromises,
  ILambertMaterialTexturePack,
  ILambertMaterialTextureUploaded,
  ILambertMaterialTextureUploadPromises,
  IMatcapMaterialTexturePack,
  IMatcapMaterialTextureUploaded,
  IMatcapMaterialTextureUploadPromises,
  IMaterialTexturePack,
  IMaterialTextureUploaded,
  IMaterialTextureUploadPromises,
  INormalMaterialTexturePack,
  INormalMaterialTextureUploaded,
  INormalMaterialTextureUploadPromises,
  IPhongMaterialTexturePack,
  IPhongMaterialTextureUploaded,
  IPhongMaterialTextureUploadPromises,
  IPhysicalMaterialTexturePack,
  IPhysicalMaterialTextureUploaded,
  IPhysicalMaterialTextureUploadPromises,
  IStandardMaterialTexturePack,
  IStandardMaterialTextureUploaded,
  IStandardMaterialTextureUploadPromises,
  IToonMaterialTexturePack,
  IToonMaterialTextureUploaded,
  IToonMaterialTextureUploadPromises,
  IWithTexturesActor
} from '@/Engine/Domains/Texture/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function getTexturedMaterial(mt: IBasicMaterialTextureUploaded): MeshBasicMaterial;
  function getTexturedMaterial(mt: IDepthMaterialTextureUploaded): MeshDepthMaterial;
  function getTexturedMaterial(mt: IDistanceMaterialTextureUploaded): MeshDistanceMaterial;
  function getTexturedMaterial(mt: INormalMaterialTextureUploaded): MeshNormalMaterial;
  function getTexturedMaterial(mt: IMatcapMaterialTextureUploaded): MeshMatcapMaterial;
  function getTexturedMaterial(mt: ILambertMaterialTextureUploaded): MeshLambertMaterial;
  function getTexturedMaterial(mt: IPhongMaterialTextureUploaded): MeshPhongMaterial;
  function getTexturedMaterial(mt: IPhysicalMaterialTextureUploaded): MeshPhysicalMaterial;
  function getTexturedMaterial(mt: IToonMaterialTextureUploaded): MeshToonMaterial;
  function getTexturedMaterial(mt: IStandardMaterialTextureUploaded): MeshStandardMaterial;
  function getTexturedMaterial(mt: IMaterialTextureUploaded): Material {
    const params: Omit<IMaterialTextureUploaded, 'material'> = omitInObjectWithoutMutation(mt, 'material');
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[mt.material];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${mt.material}`);
    return new MaterialConstructor(params);
  }

  function useMaterial(material: Material): void {
    // eslint-disable-next-line functional/immutable-data
    entity.material = material;
  }

  function loadMaterialTexturePack(pack: IBasicMaterialTexturePack): IBasicMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IDepthMaterialTexturePack): IDepthMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IDistanceMaterialTexturePack): IDistanceMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: INormalMaterialTexturePack): INormalMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IMatcapMaterialTexturePack): IMatcapMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: ILambertMaterialTexturePack): ILambertMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IPhongMaterialTexturePack): IPhongMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IPhysicalMaterialTexturePack): IPhysicalMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IToonMaterialTexturePack): IToonMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IStandardMaterialTexturePack): IStandardMaterialTextureUploadPromises;
  function loadMaterialTexturePack(pack: IMaterialTexturePack): IMaterialTextureUploadPromises {
    return textureService.load(pack);
  }

  function loadAndApplyMaterialTexturePack(pack: IMaterialTexturePack): Promise<void> {
    return loadMaterialTexturePack(pack)
      .all()
      .then((mt: IMaterialTextureUploaded) => useMaterial(getTexturedMaterial(mt)));
  }

  return {
    getTexturedMaterial,
    useMaterial,
    loadMaterialTexturePack,
    loadAndApplyMaterialTexturePack
  };
}
