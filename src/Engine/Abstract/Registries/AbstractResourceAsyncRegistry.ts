import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TAbstractSerializeDependencies, TAbstractSimpleRegistry } from '@/Engine/Abstract/Models';
import { getAsyncUniqEntityByKeyAsync, getUniqEntityByKey$, isNotDefined } from '@/Engine/Utils';

import { AbstractSimpleRegistry } from './AbstractSimpleRegistry';

export function AbstractResourceAsyncRegistry<T>(type: RegistryType): TAbstractResourceAsyncRegistry<T> {
  const abstractSimpleAsyncRegistry: TAbstractSimpleRegistry<T> = AbstractSimpleRegistry<T>(type);

  const findByKeyAsync = (key: string): Promise<T | undefined> => getAsyncUniqEntityByKeyAsync(key, abstractSimpleAsyncRegistry);
  const findByKey$ = (key: string): Observable<T> => getUniqEntityByKey$(key, abstractSimpleAsyncRegistry);

  function serialize<C extends TAbstractResourceConfig>({ metaInfoRegistry }: TAbstractSerializeDependencies<C>): ReadonlyArray<C> {
    return abstractSimpleAsyncRegistry.map((_value: unknown, key: string | undefined): C => {
      if (isNotDefined(key)) throw new Error(`[${type}]: Cannot serialize resource: key "${key}" is not found`);
      const result: C | undefined = metaInfoRegistry.findByKey(key);
      if (isNotDefined(result)) throw new Error(`[${type}]: Cannot serialize resource: meta info is not found for the resource with name "${key}"`);
      return result;
    });
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractSimpleAsyncRegistry, {
    findByKey$,
    findByKeyAsync,
    getByKeyAsync: async (name: string): Promise<T | never> => {
      const result: T | undefined = await findByKeyAsync(name);
      if (isNotDefined(result)) throw new Error(`[REGISTRY]: Cannot get resource by name "${name}" from registry ${abstractSimpleAsyncRegistry.id}: resource is not found`);
      return result;
    },
    serialize
  });
}
