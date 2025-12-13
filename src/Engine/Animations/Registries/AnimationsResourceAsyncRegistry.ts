import { AbstractResourceAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TAnimations, TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig, TAnimationsSerializeResourcesDependencies } from '@/Engine/Animations/Models';
import { isNotDefined } from '@/Engine/Utils';

export function AnimationsResourceAsyncRegistry(): TAnimationsResourceAsyncRegistry {
  const registry = Object.assign(AbstractResourceAsyncRegistry<TAnimations>(RegistryType.Animations), {
    // TODO 15-0-0: could we extract this function as a generic one?
    serialize: ({ metaInfoRegistry }: TAnimationsSerializeResourcesDependencies): ReadonlyArray<TAnimationsResourceConfig> => {
      return registry.map((_value: TAnimations, key: string | undefined): TAnimationsResourceConfig => {
        if (isNotDefined(key)) throw new Error(`[AnimationsResourceAsyncRegistry]: Cannot serialize resource: key "${key}" is not found`);
        const result: TAnimationsResourceConfig | undefined = metaInfoRegistry.findByKey(key);
        if (isNotDefined(result)) throw new Error(`[AnimationsResourceAsyncRegistry]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
        return result;
      });
    }
  });

  return registry;
}
