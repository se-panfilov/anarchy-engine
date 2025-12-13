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
  TTextureAsyncRegistry,
  TTextureLoadedPack,
  TTexturePackParams,
  TTextureService,
  TTextureUploaded,
  TTextureUploadPromises,
  TToonTextureUploaded,
  TToonTextureUploadPromises
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function TextureServiceLoaderUtils(registry: TTextureAsyncRegistry): Pick<TTextureService, 'load' | 'loadList' | 'loadMaterialPack'> {
  const textureLoader: TextureLoader = new TextureLoader();

  function loadMaterialPack(m: TMaterialPackParams<TBasicMaterialTexturePack>): TBasicTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TDepthMaterialTexturePack>): TDepthTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TDistanceMaterialTexturePack>): TDistanceTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TNormalMaterialTexturePack>): TNormalTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TMatcapMaterialTexturePack>): TMatcapTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TLambertMaterialTexturePack>): TLambertTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TPhongMaterialTexturePack>): TPhongTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TPhysicalMaterialTexturePack>): TPhysicalTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TToonMaterialTexturePack>): TToonTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TStandardMaterialTexturePack>): TStandardTextureUploadPromises;
  function loadMaterialPack(m: TMaterialPackParams<TMaterialTexturePack>): TTextureUploadPromises {
    let promises: Omit<TTextureUploadPromises, 'all' | 'material'> = {};
    if (isNotDefined(m.textures)) return { ...promises, all };

    Object.entries(m.textures).forEach(([key, packParams]: [string, TTexturePackParams]): void => {
      const { url, params }: TTexturePackParams = packParams;
      const p: Promise<TTextureLoadedPack> = load({ url, params });

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

  // TODO 9.0.0. RESOURCES: add isForce param to load the texture anyway
  // TODO 9.0.0. RESOURCES: should be possible to load the same texture with different params (and store them separately in registry)
  // TODO 9.0.0. RESOURCES: colorSpace, should be able to set via params/config
  function load({ url, params }: TTexturePackParams, colorSpace?: TMaterialPackKeys): Promise<TTextureLoadedPack> {
    const texture = registry.findByKey(url);
    // TODO 9.0.0. RESOURCES: check if this is working and we return already loaded texture
    if (isDefined(texture)) return Promise.resolve({ url, texture });

    return textureLoader.loadAsync(url).then((texture: TWriteable<TTexture>): TTextureLoadedPack => {
      applyTextureParams(texture, params);
      if (isDefined(colorSpace)) applyColorSpace(colorSpace as TMaterialPackKeys, texture, params);
      applyFilters(texture, params);
      return { url, texture };
    });
  }

  function loadList(packs: ReadonlyArray<TTexturePackParams>): ReadonlyArray<Promise<TTextureLoadedPack>> {
    return packs.map((pack: TTexturePackParams): Promise<TTextureLoadedPack> => load(pack));
  }

  return {
    load,
    loadList,
    loadMaterialPack
  };
}
