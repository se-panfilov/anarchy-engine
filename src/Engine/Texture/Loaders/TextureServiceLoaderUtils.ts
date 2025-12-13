import type {
  TBasicMaterialTexturePack,
  TDepthMaterialTexturePack,
  TDistanceMaterialTexturePack,
  TLambertMaterialTexturePack,
  TMatcapMaterialTexturePack,
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
  TTextureAsyncRegistry,
  TTextureLoadedPack,
  TTexturePackParams,
  TTextureUploaded,
  TTextureUploadPromises,
  TToonTextureUploaded,
  TToonTextureUploadPromises
} from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

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
