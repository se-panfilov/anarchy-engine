import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TTexture, TTextureAsyncRegistry, TTextureResourceConfig, TTextureSerializeResourcesDependencies } from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

export function TextureResourceAsyncRegistry(): TTextureAsyncRegistry {
  const registry = Object.assign(AbstractResourceAsyncRegistry<TTexture>(RegistryType.Texture), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TTextureSerializeResourcesDependencies): ReadonlyArray<TTextureResourceConfig> => {
      return registry.map((_value: TTexture, key: string | undefined): TTextureResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[TextureAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TTextureResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[TextureAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
