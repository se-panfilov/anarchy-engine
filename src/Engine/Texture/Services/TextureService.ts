import { TextureLoader } from 'three';

import type {
  TBasicMaterialTexturePack,
  TDepthMaterialTexturePack,
  TDistanceMaterialTexturePack,
  TLambertMaterialTexturePack,
  TMatcapMaterialTexturePack,
  TMaterialPackKeys,
  TMaterialPackParams,
  TMaterialTexturePack,
  TNormalMaterialTexturePack,
  TPhongMaterialTexturePack,
  TPhysicalMaterialTexturePack,
  TStandardMaterialTexturePack,
  TTexturePackParams,
  TToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type {
  TBasicTextureUploaded,
  TBasicTextureUploadPromises,
  TDepthTextureUploaded,
  TDepthTextureUploadPromises,
  TDistanceTextureUploaded,
  TDistanceTextureUploadPromises,
  TLambertTextureUploaded,
  TLambertTextureUploadPromises,
  TMatcapTextureUploaded,
  TMatcapTextureUploadPromises,
  TNormalTextureUploaded,
  TNormalTextureUploadPromises,
  TPhongTextureUploaded,
  TPhongTextureUploadPromises,
  TPhysicalTextureUploaded,
  TPhysicalTextureUploadPromises,
  TStandardTextureUploaded,
  TStandardTextureUploadPromises,
  TTexture,
  TTextureService,
  TTextureUploaded,
  TTextureUploadPromises,
  TToonTextureUploaded,
  TToonTextureUploadPromises
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function TextureService(): TTextureService {
  const textureLoader: TextureLoader = new TextureLoader();

  function load(m: TMaterialPackParams<TBasicMaterialTexturePack>): TBasicTextureUploadPromises;
  function load(m: TMaterialPackParams<TDepthMaterialTexturePack>): TDepthTextureUploadPromises;
  function load(m: TMaterialPackParams<TDistanceMaterialTexturePack>): TDistanceTextureUploadPromises;
  function load(m: TMaterialPackParams<TNormalMaterialTexturePack>): TNormalTextureUploadPromises;
  function load(m: TMaterialPackParams<TMatcapMaterialTexturePack>): TMatcapTextureUploadPromises;
  function load(m: TMaterialPackParams<TLambertMaterialTexturePack>): TLambertTextureUploadPromises;
  function load(m: TMaterialPackParams<TPhongMaterialTexturePack>): TPhongTextureUploadPromises;
  function load(m: TMaterialPackParams<TPhysicalMaterialTexturePack>): TPhysicalTextureUploadPromises;
  function load(m: TMaterialPackParams<TToonMaterialTexturePack>): TToonTextureUploadPromises;
  function load(m: TMaterialPackParams<TStandardMaterialTexturePack>): TStandardTextureUploadPromises;
  function load(m: TMaterialPackParams<TMaterialTexturePack>): TTextureUploadPromises {
    let promises: Omit<TTextureUploadPromises, 'all' | 'material'> = {};
    if (isNotDefined(m.textures)) return { ...promises, all };

    Object.entries(m.textures).forEach(([key, packParams]: [string, TTexturePackParams]): void => {
      // TODO do not load texture if already loaded to the scene
      const { url, params }: TTexturePackParams = packParams;
      const p: Promise<TTexture> = textureLoader.loadAsync(url).then((texture: TWriteable<TTexture>): TTexture => {
        applyTextureParams(texture, params);
        applyColorSpace(key as TMaterialPackKeys, texture, params);
        applyFilters(texture, params);
        return texture;
      });

      promises = { ...promises, [key]: p };
    });

    function all(): Promise<TBasicTextureUploaded>;
    function all(): Promise<TDepthTextureUploaded>;
    function all(): Promise<TDistanceTextureUploaded>;
    function all(): Promise<TNormalTextureUploaded>;
    function all(): Promise<TMatcapTextureUploaded>;
    function all(): Promise<TLambertTextureUploaded>;
    function all(): Promise<TPhongTextureUploaded>;
    function all(): Promise<TPhysicalTextureUploaded>;
    function all(): Promise<TToonTextureUploaded>;
    function all(): Promise<TStandardTextureUploaded>;
    function all(): Promise<TTextureUploaded> {
      let uploaded: TTextureUploaded = {};
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

export const textureService: TTextureService = TextureService();
