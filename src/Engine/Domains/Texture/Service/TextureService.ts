import { TextureLoader } from 'three';

import type {
  IBasicMaterialTexturePack,
  IBasicMaterialTextureUploadPromises,
  IDepthMaterialTexturePack,
  IDepthMaterialTextureUploadPromises,
  IDistanceMaterialTexturePack,
  IDistanceMaterialTextureUploadPromises,
  ILamberMaterialTexturePack,
  ILamberMaterialTextureUploadPromises,
  IMatcapMaterialTexturePack,
  IMatcapMaterialTextureUploadPromises,
  IMaterialPackKeys,
  IMaterialTexturePack,
  IMaterialTextureUploaded,
  IMaterialTextureUploadPromises,
  INormalMaterialTexturePack,
  INormalMaterialTextureUploadPromises,
  IPhongMaterialTexturePack,
  IPhongMaterialTextureUploadPromises,
  IPhysicalMaterialTexturePack,
  IPhysicalMaterialTextureUploadPromises,
  IStandardMaterialTexturePack,
  IStandardMaterialTextureUploadPromises,
  ITexture,
  ITextureService,
  IToonMaterialTexturePack,
  IToonMaterialTextureUploadPromises
} from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(pack: IBasicMaterialTexturePack): IBasicMaterialTextureUploadPromises;
  function load(pack: IDepthMaterialTexturePack): IDepthMaterialTextureUploadPromises;
  function load(pack: IDistanceMaterialTexturePack): IDistanceMaterialTextureUploadPromises;
  function load(pack: INormalMaterialTexturePack): INormalMaterialTextureUploadPromises;
  function load(pack: IMatcapMaterialTexturePack): IMatcapMaterialTextureUploadPromises;
  function load(pack: ILamberMaterialTexturePack): ILamberMaterialTextureUploadPromises;
  function load(pack: IPhongMaterialTexturePack): IPhongMaterialTextureUploadPromises;
  function load(pack: IPhysicalMaterialTexturePack): IPhysicalMaterialTextureUploadPromises;
  function load(pack: IToonMaterialTexturePack): IToonMaterialTextureUploadPromises;
  function load(pack: IStandardMaterialTexturePack): IStandardMaterialTextureUploadPromises;
  function load(pack: IMaterialTexturePack): IMaterialTextureUploadPromises {
    let promises: Omit<IMaterialTextureUploadPromises, 'all'> = {};

    Object.entries(pack).forEach(([key, { url, params }]): void => {
      const p: Promise<ITexture> = textureLoader.loadAsync(url).then((texture: IWriteable<ITexture>): ITexture => {
        applyTextureParams(texture, params);
        applyColorSpace(key as IMaterialPackKeys, texture, params);
        applyFilters(texture, params);
        return texture;
      });
      promises = { ...promises, [key]: p };
    });

    const all: () => Promise<IMaterialTextureUploaded> = () =>
      Promise.all(Object.values(promises)).then((textures: ReadonlyArray<ITexture>): IMaterialTextureUploaded => {
        let uploaded: IMaterialTextureUploaded = {};
        Object.keys(pack).forEach((key: string, index: number): void => void (uploaded = { ...uploaded, [key]: textures[index] }));
        return uploaded;
      });

    return { ...promises, all };
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
