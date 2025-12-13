import type { TAsyncReactiveFactory, TCreateAsyncEntityFactoryFn } from '@/Engine/Abstract';
import { AsyncReactiveFactory, FactoryType } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Texture/Adapters';
import type { TTexture, TTextureDependencies, TTextureFactory, TTextureParams, TTextureWithPhysicsDependencies, TTextureWrapperWithPhysicsAsync } from '@/Engine/Texture/Models';
import { Texture } from '@/Engine/Texture/Wrappers';

async function createTexture(params: TTextureParams, dependencies: TTextureDependencies | TTextureWithPhysicsDependencies): Promise<TTexture | TTextureWrapperWithPhysicsAsync> {
  return await Texture(params, dependencies);
}

const factory: TAsyncReactiveFactory<TTexture, TTextureParams> = {
  ...AsyncReactiveFactory(FactoryType.Texture, createTexture as TCreateAsyncEntityFactoryFn<TTexture, TTextureParams>)
};
export const TextureFactory = (): TTextureFactory => ({ ...factory, configToParams });
