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
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
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
  TTextureFactory,
  TTexturePackConfig,
  TTexturePackParams,
  TTextureService,
  TTextureUploaded,
  TTextureUploadPromises,
  TToonTextureUploaded,
  TToonTextureUploadPromises
} from '@/Engine/Texture/Models';
import { applyColorSpace, applyFilters, applyTextureParams } from '@/Engine/Texture/Services/TextureServiceHelper';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function TextureService(factory: TTextureFactory, registry: TTextureAsyncRegistry): TTextureService {
  const textureLoader: TextureLoader = new TextureLoader();
  factory.entityCreated$.subscribe((texture: TTexture): void => registry.add(texture));

  const createAsync = (params: TTexturePackParams): Promise<TTexture> => factory.createAsync(params, { materialTextureService });

  function createFromConfigAsync(textures: ReadonlyArray<TTexturePackConfig>): Promise<ReadonlyArray<TTexture>> {
    return textures.map((config: TTexturePackConfig): Promise<TTexture> => factory.createAsync(factory.configToParams(config), { materialTextureService }));
  }

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
      // TODO 9.0.0. RESOURCES: Do not load texture if already loaded to the scene (check registry)
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

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    // TODO DESTROY: unload textures (maybe in registry)
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfigAsync,
    loadMaterialPack,
    getFactory: (): TTextureFactory => factory,
    getRegistry: (): TTextureAsyncRegistry => registry,
    ...destroyable
  };
}
