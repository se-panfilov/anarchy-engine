import { TextureLoader } from 'three';

import type { IMaterialPackKeys, IMaterialProps, MaterialType } from '@/Engine/Material';
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

  function load(m: IMaterialProps<IBasicMaterialTexturePack>): IBasicTextureUploadPromises;
  function load(m: IMaterialProps<IDepthMaterialTexturePack>): IDepthTextureUploadPromises;
  function load(m: IMaterialProps<IDistanceMaterialTexturePack>): IDistanceTextureUploadPromises;
  function load(m: IMaterialProps<INormalMaterialTexturePack>): INormalTextureUploadPromises;
  function load(m: IMaterialProps<IMatcapMaterialTexturePack>): IMatcapTextureUploadPromises;
  function load(m: IMaterialProps<ILambertMaterialTexturePack>): ILambertTextureUploadPromises;
  function load(m: IMaterialProps<IPhongMaterialTexturePack>): IPhongTextureUploadPromises;
  function load(m: IMaterialProps<IPhysicalMaterialTexturePack>): IPhysicalTextureUploadPromises;
  function load(m: IMaterialProps<IToonMaterialTexturePack>): IToonTextureUploadPromises;
  function load(m: IMaterialProps<IStandardMaterialTexturePack>): IStandardTextureUploadPromises;
  function load(m: IMaterialProps<IMaterialTexturePack>): ITextureUploadPromises {
    let promises: Omit<ITextureUploadPromises, 'all' | 'material'> = {};
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
