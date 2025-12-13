import type { IAbstractAsyncRegistry } from '@/Engine/Abstract';
import { AbstractAsyncRegistry } from '@/Engine/Abstract';
import { getValueAsync } from '@/Engine/Abstract/Registry/AbstractAsyncRegistryHelper';
import type { IRegistrable } from '@/Engine/Mixins';

describe('AbstractAsyncRegistryHelper', () => {
  let registry: IAbstractAsyncRegistry<IRegistrable>;
  let filterFn: (entity: IRegistrable) => boolean;
  let waitingTime: number;

  const mockEntity1: IRegistrable = { id: 'mockEntityId1', name: 'mockEntity1' } as unknown as IRegistrable;
  const mockEntity2: IRegistrable = { id: 'mockEntityId2', name: 'mockEntity2' } as unknown as IRegistrable;
  const mockEntity3: IRegistrable = { id: 'mockEntityId3', name: 'mockEntity3' } as unknown as IRegistrable;
  const mockEntity4: IRegistrable = { id: 'mockEntityId4', name: 'mockEntity4' } as unknown as IRegistrable;
  const mockEntity5: IRegistrable = { id: 'mockEntityId5', name: 'mockEntity5' } as unknown as IRegistrable;
  const mockEntity6: IRegistrable = { id: 'mockEntityId6', name: 'mockEntity6' } as unknown as IRegistrable;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    registry = AbstractAsyncRegistry<IRegistrable>('mockEntity' as any);
    filterFn = (): boolean => true;
    waitingTime = 50;
  });

  describe('getValueAsync', () => {
    it('should return the only entity that was added in the past', async () => {
      registry.add(mockEntity1);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity1);
    });

    it('should return the only entity that was added in the past when it is multiple entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    });

    it('should return "undefined" when no such entity', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      filterFn = (entity: IRegistrable): boolean => entity.id === 'wheteverId';
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      expect(result).toBeUndefined();
    });

    it('should return the only entity that will be added after', async () => {
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity1);
      expect(result).toEqual(mockEntity1);
    });

    it('should return the only entity that will be added async after', async () => {
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity1.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, 65);
      setTimeout(() => registry.add(mockEntity1), 50);
      expect(result).toEqual(mockEntity1);
    });

    it('should return an entity that will be added among others after', async () => {
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, 65);
      setTimeout(() => registry.add(mockEntity1), 50);
      setTimeout(() => registry.add(mockEntity2), 60);
      setTimeout(() => registry.add(mockEntity3), 40);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added among others after', async () => {
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added after, among the mixed added entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity3);
      registry.add(mockEntity4);
      expect(result).toEqual(mockEntity3);
    });

    it('should return an entity that was added before, among the mixed added entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, waitingTime);
      registry.add(mockEntity3);
      registry.add(mockEntity4);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added after, among the mixed async added entities', async () => {
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 50);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity3.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, 65);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 30);
      expect(result).toEqual(mockEntity3);
    });

    it('should not interfere with other registries ("registryB" should not throw an error)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryA: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntityA' as any);
      registryA.add(mockEntity1);
      registryA.add(mockEntity2);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryB: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntityB' as any);
      registryB.add(mockEntity3);
      registryB.add(mockEntity4);

      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registryA, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    });

    it('should perform several consecutive searches', async () => {
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
    });

    it('should return undefined when an entity was removed from registry', async () => {
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
    });

    it('should return an entity which was removed from registry and added again', async () => {
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

      const filterFn3 = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result3: IRegistrable | undefined = await getValueAsync(registry, filterFn3, undefined, waitingTime);
      expect(result3).toEqual(mockEntity2);
    });

    it('should return an entity when another entity was removed from registry', async () => {
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
    });

    it('should return an "undefined" when the waiting time is exceeded', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity1), 100);
      filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;
      const result: IRegistrable | undefined = await getValueAsync(registry, filterFn, undefined, 10);
      expect(result).toBeUndefined();
    });
  });
});
