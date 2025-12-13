import type { IAbstractAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import { AbstractAsyncRegistry } from '@/Engine/Abstract';
import { getValueAsync } from '@/Engine/Abstract/Registry/AbstractAsyncRegistryHelper';
import type { IRegistrable } from '@/Engine/Mixins';

describe('AbstractAsyncRegistryHelper', () => {
  const waitingTime: number = 500;

  const mockEntity1: IRegistrable = { id: 'mockEntityId1', name: 'mockEntity1' } as unknown as IRegistrable;
  const mockEntity2: IRegistrable = { id: 'mockEntityId2', name: 'mockEntity2' } as unknown as IRegistrable;
  const mockEntity3: IRegistrable = { id: 'mockEntityId3', name: 'mockEntity3' } as unknown as IRegistrable;
  const mockEntity4: IRegistrable = { id: 'mockEntityId4', name: 'mockEntity4' } as unknown as IRegistrable;
  const mockEntity5: IRegistrable = { id: 'mockEntityId5', name: 'mockEntity5' } as unknown as IRegistrable;
  const mockEntity6: IRegistrable = { id: 'mockEntityId6', name: 'mockEntity6' } as unknown as IRegistrable;

  describe('getValueAsync', () => {
    it('should return an entity that was added sync before getting the value', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 1000);

    it('should return an entity that was added async before getting the value', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 50);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 50);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 1000);

    it('should return "undefined" when no such entity', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn = (entity: IRegistrable): boolean => entity.id === 'wheteverId';
      const promise: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn, undefined, waitingTime);
      setTimeout(() => registry.add(mockEntity4), 50);
      setTimeout(() => registry.add(mockEntity5), 50);
      const result: IRegistrable | undefined = await promise;
      expect(result).toBeUndefined();
    }, 1000);

    it('should return an entity that will be added after getting the value', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const promise: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn, undefined, 65);
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 60);
      setTimeout(() => registry.add(mockEntity3), 40);
      const result: IRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity2);
    }, 1000);

    it('should return an entity that will be added after getting the value, among the mixed added entities', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 60);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const promise: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 60);
      const result: IRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity3);
    }, 1000);

    it('should return an entity that was added before getting the value but async, among the mixed added entities', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 60);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 60);
      expect(result).toEqual(mockEntity2);
    }, 1000);

    it('should return an entity that will be added after getting the value, among the mixed async added entities', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 50);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const promise: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn, undefined, 65);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 30);
      const result: IRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity3);
    }, 1000);

    it('should not interfere with other registries ("registryB" should not throw an error)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryA: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registryA.add(mockEntity1);
      setTimeout(() => registryA.add(mockEntity2), 60);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryB: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntityB' as any);
      registryB.add(mockEntity3);
      setTimeout(() => registryB.add(mockEntity4), 60);

      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registryA, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 1000);

    it('should perform several consecutive searches', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      const filterFn1 = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const result1: IRegistrable | undefined = await getValueAsync(registry, filterFn1, undefined, waitingTime);
      registry.add(mockEntity2);
      expect(result1).toEqual(mockEntity1);

      registry.add(mockEntity3);
      const filterFn2 = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const result2: IRegistrable | undefined = await getValueAsync(registry, filterFn2, undefined, waitingTime);
      registry.add(mockEntity4);
      expect(result2).toEqual(mockEntity3);

      registry.add(mockEntity5);
      const filterFn3 = (entity: IRegistrable): boolean => entity.id === mockEntity5.id;
      const result3: IRegistrable | undefined = await getValueAsync(registry, filterFn3, undefined, waitingTime);
      registry.add(mockEntity6);
      expect(result3).toEqual(mockEntity5);
    }, 1000);

    it('should perform several consecutive async searches', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      setTimeout(() => registry.add(mockEntity1), 60);
      const filterFn1 = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const result1: IRegistrable | undefined = await getValueAsync(registry, filterFn1, undefined, waitingTime);
      setTimeout(() => registry.add(mockEntity2), 60);
      expect(result1).toEqual(mockEntity1);

      setTimeout(() => registry.add(mockEntity3), 60);
      const filterFn2 = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const result2: IRegistrable | undefined = await getValueAsync(registry, filterFn2, undefined, waitingTime);
      setTimeout(() => registry.add(mockEntity4), 60);
      expect(result2).toEqual(mockEntity3);

      setTimeout(() => registry.add(mockEntity5), 60);
      const filterFn3 = (entity: IRegistrable): boolean => entity.id === mockEntity5.id;
      const result3: IRegistrable | undefined = await getValueAsync(registry, filterFn3, undefined, waitingTime);
      setTimeout(() => registry.add(mockEntity6), 60);
      expect(result3).toEqual(mockEntity5);
    }, 1000);

    it('should perform several parallel searches', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      const filterFn1 = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const filterFn2 = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const filterFn3 = (entity: IRegistrable): boolean => entity.id === mockEntity5.id;

      setTimeout(() => registry.add(mockEntity2), 50);
      setTimeout(() => registry.add(mockEntity3), 40);
      setTimeout(() => registry.add(mockEntity4), 20);

      const promise1: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn1, undefined, waitingTime);
      const promise2: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn2, undefined, waitingTime);
      const promise3: Promise<IRegistrable | undefined> = getValueAsync(registry, filterFn3, undefined, waitingTime);

      setTimeout(() => registry.add(mockEntity5), 10);
      setTimeout(() => registry.add(mockEntity6), 60);

      const result1: IRegistrable | undefined = await promise1;
      expect(result1).toEqual(mockEntity1);

      const result2: IRegistrable | undefined = await promise2;
      expect(result2).toEqual(mockEntity3);

      const result3: IRegistrable | undefined = await promise3;
      expect(result3).toEqual(mockEntity5);
    }, 1000);

    it('should return an "undefined" when the entity was removed from registry', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn1 = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result1: IRegistrable | undefined = await getValueAsync(registry, filterFn1, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity2.id);

      const filterFn2 = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result2: IRegistrable | undefined = await getValueAsync(registry, filterFn2, undefined, waitingTime);
      expect(result2).toBeUndefined();
    }, 1000);

    it('should return an entity which was removed from registry and added again', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;

      const result1: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity2.id);

      const result2: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result2).toBeUndefined();

      registry.add(mockEntity2);
      const result3: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result3).toEqual(mockEntity2);
    }, 1000);

    it('should return an entity when another entity was removed from registry', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn1 = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result1: IRegistrable | undefined = await getValueAsync(registry, filterFn1, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity1.id);
      const filterFn2 = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result2: IRegistrable | undefined = await getValueAsync(registry, filterFn2, undefined, waitingTime);
      expect(result2).toEqual(mockEntity2);
    }, 1000);

    it('should return an "undefined" when the waiting time is exceeded', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(mockEntity1);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity2), 50);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, 10);
      expect(result).toBeUndefined();
    }, 1000);
  });
});
