import { TextureLoader } from 'three';

import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  TMaterialPackKeys,
  TMaterialPackParams,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  TTexturePackParams,
  IToonMaterialTexturePack,
  TMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type {
  IBasicTextureUploaded,
  IBasicTextureUploadPromises,
  IDepthTextureUploaded,
  IDepthTextureUploadPromises,
  IDistanceTextureUploaded,
  IDistanceTextureUploadPromises,
  ILambertTextureUploaded,
  ILambertTextureUploadPromises,
  IMatcapTextureUploaded,
  IMatcapTextureUploadPromises,
  INormalTextureUploaded,
  INormalTextureUploadPromises,
  IPhongTextureUploaded,
  IPhongTextureUploadPromises,
  IPhysicalTextureUploaded,
  IPhysicalTextureUploadPromises,
  IStandardTextureUploaded,
  IStandardTextureUploadPromises,
  ITextureService,
  ITextureUploaded,
  ITextureUploadPromises,
  IToonTextureUploaded,
  IToonTextureUploadPromises,
  TTexture
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function TextureService(): ITextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(m: TMaterialPackParams<IBasicMaterialTexturePack>): IBasicTextureUploadPromises;
  function load(m: TMaterialPackParams<IDepthMaterialTexturePack>): IDepthTextureUploadPromises;
  function load(m: TMaterialPackParams<IDistanceMaterialTexturePack>): IDistanceTextureUploadPromises;
  function load(m: TMaterialPackParams<INormalMaterialTexturePack>): INormalTextureUploadPromises;
  function load(m: TMaterialPackParams<IMatcapMaterialTexturePack>): IMatcapTextureUploadPromises;
  function load(m: TMaterialPackParams<ILambertMaterialTexturePack>): ILambertTextureUploadPromises;
  function load(m: TMaterialPackParams<IPhongMaterialTexturePack>): IPhongTextureUploadPromises;
  function load(m: TMaterialPackParams<IPhysicalMaterialTexturePack>): IPhysicalTextureUploadPromises;
  function load(m: TMaterialPackParams<IToonMaterialTexturePack>): IToonTextureUploadPromises;
  function load(m: TMaterialPackParams<IStandardMaterialTexturePack>): IStandardTextureUploadPromises;
  function load(m: TMaterialPackParams<TMaterialTexturePack>): ITextureUploadPromises {
    let promises: Omit<ITextureUploadPromises, 'all' | 'material'> = {};
    if (isNotDefined(m.textures)) return { ...promises, all };

    Object.entries(m.textures).forEach(([key, packParams]: [string, TTexturePackParams]): void => {
      // TODO (S.Panfilov) do not load texture if already loaded
      const { url, params }: TTexturePackParams = packParams;
      const p: Promise<TTexture> = textureLoader.loadAsync(url).then((texture: TWriteable<TTexture>): TTexture => {
        applyTextureParams(texture, params);
        applyColorSpace(key as TMaterialPackKeys, texture, params);
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
