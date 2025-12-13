import type { IMesh } from '@/Engine/Domains/Actor';
import type { ITypeOfMaterials } from '@/Engine/Domains/Material';
import { MaterialMap } from '@/Engine/Domains/Material';
import type {
  IBasicMaterialTexturePack,
  IBasicMaterialTextureUploaded,
  IDepthMaterialTexturePack,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTexturePack,
  IDistanceMaterialTextureUploaded,
  ILambertMaterialTexturePack,
  ILambertMaterialTextureUploaded,
  IMatcapMaterialTexturePack,
  IMatcapMaterialTextureUploaded,
  IMaterialTexturePack,
  IMaterialTextureUploaded,
  INormalMaterialTexturePack,
  INormalMaterialTextureUploaded,
  IPhongMaterialTexturePack,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTexturePack,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTexturePack,
  IStandardMaterialTextureUploaded,
  IToonMaterialTexturePack,
  IToonMaterialTextureUploaded
} from '@/Engine/Domains/Texture';
import { textureService } from '@/Engine/Domains/Texture';
import type { IWithTexturesActor } from '@/Engine/Domains/Texture/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function useTextureAsMaterial(mt: IBasicMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IDepthMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IDistanceMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: INormalMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IMatcapMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: ILambertMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IPhongMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IPhysicalMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IToonMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IStandardMaterialTextureUploaded): void;
  function useTextureAsMaterial(mt: IMaterialTextureUploaded): void {
    const params: Omit<IMaterialTextureUploaded, 'material'> = omitInObjectWithoutMutation(mt, 'material');
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[mt.material];
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${mt.material}`);

    // eslint-disable-next-line functional/immutable-data
    entity.material = new MaterialConstructor(params);
  }

  function loadMaterialTexturePack(pack: IBasicMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IDepthMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IDistanceMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: INormalMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IMatcapMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: ILambertMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IPhongMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IPhysicalMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IToonMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IStandardMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IMaterialTexturePack): Promise<void> {
    return textureService.load(pack).all().then(useTextureAsMaterial);
  }

  return {
    useTextureAsMaterial,
    loadMaterialTexturePack
  };
}
