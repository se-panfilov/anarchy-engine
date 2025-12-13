import type { TTextureAsyncRegistry } from '@/Engine/Texture';

export type TMaterialEntityToConfigDependencies = Readonly<{
  textureResourceRegistry: TTextureAsyncRegistry;
}>;
