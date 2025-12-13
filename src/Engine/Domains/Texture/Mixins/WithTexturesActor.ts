import type { IMesh } from '@/Engine/Domains/Actor';
import { ITypeOfMaterials, MaterialMap } from '@/Engine/Domains/Material';
import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialTexturePack,
  IMaterialTextureUploaded,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from '@/Engine/Domains/Texture';
import { textureService } from '@/Engine/Domains/Texture';
import type { IWithTexturesActor } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function useTextureAsMaterial(mt: IMaterialTextureUploaded): void {
    const params: Omit<IMaterialTextureUploaded, 'material'> = omitInObjectWithoutMutation(mt, 'material');
    const MaterialConstructor: ITypeOfMaterials = MaterialMap[mt.material];
    console.log('111 MaterialConstructor', MaterialConstructor);
    if (isNotDefined(MaterialConstructor)) throw new Error(`Unsupported material type: ${mt.material}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return textureService
      .load(pack as any)
      .all()
      .then(useTextureAsMaterial);
  }

  return {
    useTextureAsMaterial,
    loadMaterialTexturePack
  };
}
