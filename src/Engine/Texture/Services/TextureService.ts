import { TextureLoader } from 'three';

import type { IMaterialPackKeys, IMaterialProps, MaterialType } from '@/Engine/Material';
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
  ITexture,
  ITexturePackParams,
  ITextureService,
  IToonMaterialTexturePack,
  IToonMaterialTextureUploaded,
  IToonMaterialTextureUploadPromises
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(m: IMaterialProps<IBasicMaterialTexturePack>): IBasicMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IDepthMaterialTexturePack>): IDepthMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IDistanceMaterialTexturePack>): IDistanceMaterialTextureUploadPromises;
  function load(m: IMaterialProps<INormalMaterialTexturePack>): INormalMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IMatcapMaterialTexturePack>): IMatcapMaterialTextureUploadPromises;
  function load(m: IMaterialProps<ILambertMaterialTexturePack>): ILambertMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IPhongMaterialTexturePack>): IPhongMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IPhysicalMaterialTexturePack>): IPhysicalMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IToonMaterialTexturePack>): IToonMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IStandardMaterialTexturePack>): IStandardMaterialTextureUploadPromises;
  function load(m: IMaterialProps<IMaterialTexturePack>): IMaterialTextureUploadPromises {
    let promises: Omit<IMaterialTextureUploadPromises, 'all' | 'material'> = {};
    const material: MaterialType = m.type;

    if (isNotDefined(m.textures)) return { ...promises, all };

    Object.entries(m.textures).forEach(([key, packParams]: [string, ITexturePackParams]): void => {
      // TODO (S.Panfilov) do not load texture if already loaded
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
    function all(): Promise<ILambertMaterialTextureUploaded>;
    function all(): Promise<IPhongMaterialTextureUploaded>;
    function all(): Promise<IPhysicalMaterialTextureUploaded>;
    function all(): Promise<IToonMaterialTextureUploaded>;
    function all(): Promise<IStandardMaterialTextureUploaded>;
    function all(): Promise<IMaterialTextureUploaded> {
      let uploaded: IMaterialTextureUploaded = {};
      return Promise.all(Object.values(promises)).then((textures) => {
        if (isNotDefined(m.textures)) return { ...uploaded, material };
        Object.keys(m.textures).forEach((key: string, index: number): void => void (uploaded = { ...uploaded, [key]: textures[index] }));
        return { ...uploaded, material };
      });
    }

    return { ...promises, all };
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
