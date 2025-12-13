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

  function loadTexturePack(pack: IBasicMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IDepthMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IDistanceMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: INormalMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IMatcapMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: ILamberMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IPhongMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IPhysicalMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IToonMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IStandardMaterialTexturePack): Promise<void>;
  function loadTexturePack(pack: IMaterialTexturePack): Promise<void> {
    const textures: IMaterialTextureUploadPromises = textureService.load(pack);
    return textures.all().then((textures: IMaterialTextureUploaded) => useTextureAsMaterial({ ...textures }));
  }

  return {
    useTextureAsMaterial,
    loadTexturePack
  };
}
