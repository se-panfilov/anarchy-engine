import { TextureLoader } from 'three';

import type { MaterialType } from '@/Engine/Domains/Material';
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
  ILamberMaterialTexturePack,
  ILamberMaterialTextureUploaded,
  ILamberMaterialTextureUploadPromises,
  IMatcapMaterialTexturePack,
  IMatcapMaterialTextureUploaded,
  IMatcapMaterialTextureUploadPromises,
  IMaterialPackKeys,
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
  ITexture,
  ITexturePackParams,
  ITextureService,
  IToonMaterialTexturePack,
  IToonMaterialTextureUploaded,
  IToonMaterialTextureUploadPromises
} from '@/Engine/Domains/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams, isMaterialType } from '@/Engine/Domains/Texture/Service/TextureServiceHelper';
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

    Object.entries(pack).forEach(([key, packParams]: [string, ITexturePackParams | MaterialType]): void => {
      if (isMaterialType(packParams)) return;
      // TODO (S.Panfilov) CWP do not load texture if already loaded

      const { url, params }: ITexturePackParams = packParams;
      const p: Promise<ITexture> = textureLoader.loadAsync(url).then((texture: IWriteable<ITexture>): ITexture => {
        applyTextureParams(texture, params);
        applyColorSpace(key as IMaterialPackKeys, texture, params);
        applyFilters(texture, params);
        return texture;
      });
      promises = { ...promises, [key]: p };
    });

    function all(): Promise<IBasicMaterialTextureUploaded>;
    function all(): Promise<IDepthMaterialTextureUploaded>;
    function all(): Promise<IDistanceMaterialTextureUploaded>;
    function all(): Promise<INormalMaterialTextureUploaded>;
    function all(): Promise<IMatcapMaterialTextureUploaded>;
    function all(): Promise<ILamberMaterialTextureUploaded>;
    function all(): Promise<IPhongMaterialTextureUploaded>;
    function all(): Promise<IPhysicalMaterialTextureUploaded>;
    function all(): Promise<IToonMaterialTextureUploaded>;
    function all(): Promise<IStandardMaterialTextureUploaded>;
    function all(): Promise<IMaterialTextureUploaded> {
      return Promise.all(Object.values(promises)).then((textures) => {
        let uploaded: IMaterialTextureUploaded = {};
        Object.keys(pack).forEach((key: string, index: number): void => void (uploaded = { ...uploaded, [key]: textures[index] }));
        return uploaded;
      });
    }

    return { ...promises, all };
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
