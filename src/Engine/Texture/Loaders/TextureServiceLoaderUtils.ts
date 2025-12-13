import type {
  TBasicMaterialPackKeys,
  TBasicMaterialTexturePack,
  TDepthMaterialPackKeys,
  TDepthMaterialTexturePack,
  TDistanceMaterialPackKeys,
  TDistanceMaterialTexturePack,
  TLambertMaterialPackKeys,
  TLambertMaterialTexturePack,
  TMatcapMaterialPackKeys,
  TMatcapMaterialTexturePack,
  TMaterialPackParams,
  TMaterialTexturePack,
  TNormalMaterialPackKeys,
  TNormalMaterialTexturePack,
  TPhongMaterialPackKeys,
  TPhongMaterialTexturePack,
  TPhysicalMaterialPackKeys,
  TPhysicalMaterialTexturePack,
  TPointsMaterialPackKeys,
  TStandardMaterialPackKeys,
  TStandardMaterialTexturePack,
  TToonMaterialPackKeys,
  TToonMaterialTexturePack
} from '@/Engine/MaterialTexturePack';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

export type TTextureLoadedPack = Readonly<{
  url: string;
  texture: TTexture;
}>;

export type TBasicTextureUploaded = Readonly<{ [key in TBasicMaterialPackKeys]?: TTexture }>;
export type TDepthTextureUploaded = Readonly<{ [key in TDepthMaterialPackKeys]?: TTexture }>;
export type TDistanceTextureUploaded = Readonly<{ [key in TDistanceMaterialPackKeys]?: TTexture }>;
export type TNormalTextureUploaded = Readonly<{ [key in TNormalMaterialPackKeys]?: TTexture }>;
export type TMatcapTextureUploaded = Readonly<{ [key in TMatcapMaterialPackKeys]?: TTexture }>;
export type TLambertTextureUploaded = Readonly<{ [key in TLambertMaterialPackKeys]?: TTexture }>;
export type TPhongTextureUploaded = Readonly<{ [key in TPhongMaterialPackKeys]?: TTexture }>;
export type TPhysicalTextureUploaded = Readonly<{ [key in TPhysicalMaterialPackKeys]?: TTexture }>;
export type TToonTextureUploaded = Readonly<{ [key in TToonMaterialPackKeys]?: TTexture }>;
export type TStandardTextureUploaded = Readonly<{ [key in TStandardMaterialPackKeys]?: TTexture }>;
export type TPointsTextureUploaded = Readonly<{ [key in TPointsMaterialPackKeys]?: TTexture }>;

export type TTextureUploaded =
  | TBasicTextureUploaded
  | TDepthTextureUploaded
  | TDistanceTextureUploaded
  | TNormalTextureUploaded
  | TMatcapTextureUploaded
  | TLambertTextureUploaded
  | TPhongTextureUploaded
  | TPhysicalTextureUploaded
  | TToonTextureUploaded
  | TStandardTextureUploaded
  | TPointsTextureUploaded;

export type TGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type TBasicTextureUploadPromises = Readonly<{ [key in TBasicMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TBasicTextureUploaded>>;
export type TDepthTextureUploadPromises = Readonly<{ [key in TDepthMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TDepthTextureUploaded>>;
export type TDistanceTextureUploadPromises = Readonly<{ [key in TDistanceMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TDistanceTextureUploaded>>;
export type TNormalTextureUploadPromises = Readonly<{ [key in TNormalMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TNormalTextureUploaded>>;
export type TMatcapTextureUploadPromises = Readonly<{ [key in TMatcapMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TMatcapTextureUploaded>>;
export type TLambertTextureUploadPromises = Readonly<{ [key in TLambertMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TLambertTextureUploaded>>;
export type TPhongTextureUploadPromises = Readonly<{ [key in TPhongMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TPhongTextureUploaded>>;
export type TPhysicalTextureUploadPromises = Readonly<{ [key in TPhysicalMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TPhysicalTextureUploaded>>;
export type TToonTextureUploadPromises = Readonly<{ [key in TToonMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TToonTextureUploaded>>;
export type TStandardTextureUploadPromises = Readonly<{ [key in TStandardMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TStandardTextureUploaded>>;

export type TTextureUploadPromises =
  | TBasicTextureUploadPromises
  | TDepthTextureUploadPromises
  | TDistanceTextureUploadPromises
  | TNormalTextureUploadPromises
  | TMatcapTextureUploadPromises
  | TLambertTextureUploadPromises
  | TPhongTextureUploadPromises
  | TPhysicalTextureUploadPromises
  | TToonTextureUploadPromises
  | TStandardTextureUploadPromises;

// TODO 9.0.0. RESOURCES: This "TextureServiceLoaderUtils" utils should be killed
export function TextureServiceLoaderUtils(registry: TTextureAsyncRegistry): void {
  // TODO 9.0.0. RESOURCES: material should be "created" instead of "loaded" with the textures
  //  which is already pre-loaded and stored in the registry.
  //  So, "loadMaterialPack" should ba changed to "createMaterialPack", "all" is not needed.
  //  Also, move it to the "Material" domain.
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
}
