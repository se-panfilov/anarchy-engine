import { TextureLoader } from 'three';

import type { IMaterialPackKeys, IMaterialPackProps } from '@/Engine/Material';
import type {
  IBasicMaterialTexturePack,
  IBasicTextureUploaded,
  IBasicTextureUploadPromises,
  IDepthMaterialTexturePack,
  IDepthTextureUploaded,
  IDepthTextureUploadPromises,
  IDistanceMaterialTexturePack,
  IDistanceTextureUploaded,
  IDistanceTextureUploadPromises,
  ILambertMaterialTexturePack,
  ILambertTextureUploaded,
  ILambertTextureUploadPromises,
  IMatcapMaterialTexturePack,
  IMatcapTextureUploaded,
  IMatcapTextureUploadPromises,
  IMaterialTexturePack,
  INormalMaterialTexturePack,
  INormalTextureUploaded,
  INormalTextureUploadPromises,
  IPhongMaterialTexturePack,
  IPhongTextureUploaded,
  IPhongTextureUploadPromises,
  IPhysicalMaterialTexturePack,
  IPhysicalTextureUploaded,
  IPhysicalTextureUploadPromises,
  IStandardMaterialTexturePack,
  IStandardTextureUploaded,
  IStandardTextureUploadPromises,
  ITexture,
  ITexturePackParams,
  ITextureService,
  ITextureUploaded,
  ITextureUploadPromises,
  IToonMaterialTexturePack,
  IToonTextureUploaded,
  IToonTextureUploadPromises
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(m: IMaterialPackProps<IBasicMaterialTexturePack>): IBasicTextureUploadPromises;
  function load(m: IMaterialPackProps<IDepthMaterialTexturePack>): IDepthTextureUploadPromises;
  function load(m: IMaterialPackProps<IDistanceMaterialTexturePack>): IDistanceTextureUploadPromises;
  function load(m: IMaterialPackProps<INormalMaterialTexturePack>): INormalTextureUploadPromises;
  function load(m: IMaterialPackProps<IMatcapMaterialTexturePack>): IMatcapTextureUploadPromises;
  function load(m: IMaterialPackProps<ILambertMaterialTexturePack>): ILambertTextureUploadPromises;
  function load(m: IMaterialPackProps<IPhongMaterialTexturePack>): IPhongTextureUploadPromises;
  function load(m: IMaterialPackProps<IPhysicalMaterialTexturePack>): IPhysicalTextureUploadPromises;
  function load(m: IMaterialPackProps<IToonMaterialTexturePack>): IToonTextureUploadPromises;
  function load(m: IMaterialPackProps<IStandardMaterialTexturePack>): IStandardTextureUploadPromises;
  function load(m: IMaterialPackProps<IMaterialTexturePack>): ITextureUploadPromises {
    let promises: Omit<ITextureUploadPromises, 'all' | 'material'> = {};
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

    function all(): Promise<IBasicTextureUploaded>;
    function all(): Promise<IDepthTextureUploaded>;
    function all(): Promise<IDistanceTextureUploaded>;
    function all(): Promise<INormalTextureUploaded>;
    function all(): Promise<IMatcapTextureUploaded>;
    function all(): Promise<ILambertTextureUploaded>;
    function all(): Promise<IPhongTextureUploaded>;
    function all(): Promise<IPhysicalTextureUploaded>;
    function all(): Promise<IToonTextureUploaded>;
    function all(): Promise<IStandardTextureUploaded>;
    function all(): Promise<ITextureUploaded> {
      let uploaded: ITextureUploaded = {};
      return Promise.all(Object.values(promises)).then((textures) => {
        if (isNotDefined(m.textures)) return { ...uploaded };
        Object.keys(m.textures).forEach((key: string, index: number): void => void (uploaded = { ...uploaded, [key]: textures[index] }));
        return { ...uploaded };
      });
    }

    return { ...promises, all };
  }

  return { load };
}

export const textureService: ITextureService = TextureService();
