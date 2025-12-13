import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Texture/Adapters';
import type { TTextureDependencies, TTextureFactory, TTextureLoadedPack, TTexturePackParams, TTextureParams, TTextureWrapper } from '@/Engine/Texture/Models';

const createTexture = (pack: TTexturePackParams, { load }: TTextureDependencies): Promise<TTextureLoadedPack> => load(pack);

const factory: TAsyncReactiveFactory<TTextureWrapper, TTextureParams> = {
  ...AsyncReactiveFactory(FactoryType.Texture, createTexture as TCreateAsyncEntityFactoryFn<TTextureWrapper, TTextureParams>)
};
export const TextureFactory = (): TTextureFactory => ({ ...factory, configToParams });
