import { MeshBasicMaterial } from 'three';
import type { MeshBasicMaterialParameters } from 'three/src/materials/MeshBasicMaterial';

import type { IMesh } from '@/Engine/Domains/Actor';
import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILamberMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialTexturePack,
  IMaterialTextureUploaded,
  IMaterialTextureUploadPromises,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  IToonMaterialTexturePack
} from '@/Engine/Domains/Texture';
import { textureService } from '@/Engine/Domains/Texture';
import type { IWithTexturesActor } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function useTextureAsMaterial(maps: MeshBasicMaterialParameters): void {
    // TODO (S.Panfilov) use proper material type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
    entity.material = new MeshBasicMaterial(maps);
  }

  function loadMaterialTexturePack(pack: IBasicMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IDepthMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IDistanceMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: INormalMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IMatcapMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: ILamberMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IPhongMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IPhysicalMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IToonMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IStandardMaterialTexturePack): Promise<void>;
  function loadMaterialTexturePack(pack: IMaterialTexturePack): Promise<void> {
    const textures: IMaterialTextureUploadPromises = textureService.load(pack);
    return textures.all().then((textures: IMaterialTextureUploaded) => useTextureAsMaterial({ ...textures }));
  }

  return {
    useTextureAsMaterial,
    loadMaterialTexturePack
  };
}
