import type { TTextureAsyncRegistry } from '@hellpig/anarchy-engine/Texture';

export type TMaterialEntityToConfigDependencies = Readonly<{
  textureResourceRegistry: TTextureAsyncRegistry;
}>;
