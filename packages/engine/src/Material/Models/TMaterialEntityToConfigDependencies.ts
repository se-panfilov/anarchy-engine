import type { TTextureAsyncRegistry } from '@/Texture';

export type TMaterialEntityToConfigDependencies = Readonly<{
  textureResourceRegistry: TTextureAsyncRegistry;
}>;
