import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { textureService } from '@/Engine/Domains/Texture';
import type { ITextureParams, ITextureWrapper } from '@/Engine/Domains/Texture/Models';
import type { ITexture } from '@/Engine/Domains/ThreeLib';

export function TextureWrapper({ url }: ITextureParams): ITextureWrapper {
  const entity: ITexture = textureService.getLoader().load(
    url,
    (): void => textureService.message(`Texture "${url}" is loaded`),
    undefined,
    (error) => {
      textureService.message(`Texture "${url}" is failed to load`);
      console.log(`Texture "${url}" is failed to load`, error);
      throw error;
    }
  );

  const result = {
    ...AbstractWrapper(entity, WrapperType.Texture, params)
  };

  return result;
}
