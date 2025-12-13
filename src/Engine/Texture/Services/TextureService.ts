import { TextureLoader } from 'three';

import type {
  IBasicMaterialTexturePack,
  IDepthMaterialTexturePack,
  IDistanceMaterialTexturePack,
  ILambertMaterialTexturePack,
  IMatcapMaterialTexturePack,
  IMaterialPackKeys,
  IMaterialPackParams,
  INormalMaterialTexturePack,
  IPhongMaterialTexturePack,
  IPhysicalMaterialTexturePack,
  IStandardMaterialTexturePack,
  ITexturePackParams,
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

  function load(m: IMaterialPackParams<IBasicMaterialTexturePack>): IBasicTextureUploadPromises;
  function load(m: IMaterialPackParams<IDepthMaterialTexturePack>): IDepthTextureUploadPromises;
  function load(m: IMaterialPackParams<IDistanceMaterialTexturePack>): IDistanceTextureUploadPromises;
  function load(m: IMaterialPackParams<INormalMaterialTexturePack>): INormalTextureUploadPromises;
  function load(m: IMaterialPackParams<IMatcapMaterialTexturePack>): IMatcapTextureUploadPromises;
  function load(m: IMaterialPackParams<ILambertMaterialTexturePack>): ILambertTextureUploadPromises;
  function load(m: IMaterialPackParams<IPhongMaterialTexturePack>): IPhongTextureUploadPromises;
  function load(m: IMaterialPackParams<IPhysicalMaterialTexturePack>): IPhysicalTextureUploadPromises;
  function load(m: IMaterialPackParams<IToonMaterialTexturePack>): IToonTextureUploadPromises;
  function load(m: IMaterialPackParams<IStandardMaterialTexturePack>): IStandardTextureUploadPromises;
  function load(m: IMaterialPackParams<TMaterialTexturePack>): ITextureUploadPromises {
    let promises: Omit<ITextureUploadPromises, 'all' | 'material'> = {};
    if (isNotDefined(m.textures)) return { ...promises, all };

    Object.entries(m.textures).forEach(([key, packParams]: [string, ITexturePackParams]): void => {
      // TODO (S.Panfilov) do not load texture if already loaded
      const { url, params }: ITexturePackParams = packParams;
      const p: Promise<TTexture> = textureLoader.loadAsync(url).then((texture: TWriteable<TTexture>): TTexture => {
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
