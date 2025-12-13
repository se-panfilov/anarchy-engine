import type { IAbstractAsyncRegistry } from '@/Engine/Abstract';
import { AbstractAsyncRegistry } from '@/Engine/Abstract';
import { getValueAsync } from '@/Engine/Abstract/Registry/AbstractAsyncRegistryHelper';
import type { IRegistrable } from '@/Engine/Mixins';

type IMockEntity = IRegistrable;

describe('AbstractAsyncRegistryHelper', () => {
  let registry: IAbstractAsyncRegistry<IMockEntity>;
  let filterFn: (entity: IMockEntity) => boolean;
  let stopCb: (stop: () => void) => void;
  let waitingTime: number;

  const mockEntity1: IMockEntity = { id: 'mockEntityId1', name: 'mockEntity1' } as unknown as IMockEntity;
  const mockEntity2: IMockEntity = { id: 'mockEntityId2', name: 'mockEntity2' } as unknown as IMockEntity;
  const mockEntity3: IMockEntity = { id: 'mockEntityId3', name: 'mockEntity3' } as unknown as IMockEntity;
  const mockEntity4: IMockEntity = { id: 'mockEntityId4', name: 'mockEntity4' } as unknown as IMockEntity;
  const mockEntity5: IMockEntity = { id: 'mockEntityId5', name: 'mockEntity5' } as unknown as IMockEntity;
  const mockEntity6: IMockEntity = { id: 'mockEntityId6', name: 'mockEntity6' } as unknown as IMockEntity;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    registry = AbstractAsyncRegistry<IMockEntity>('mockEntity' as any);
    filterFn = (): boolean => true;
    stopCb = (): void => undefined;
    waitingTime = 50;
  });

  describe('getValueAsync', () => {
    it('should return the only entity that was added in the past', async () => {
      registry.add(mockEntity1);
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity1.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      expect(result).toEqual(mockEntity1);
    });

    it('should return the only entity that was added in the past when it is multiple entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      expect(result).toEqual(mockEntity2);
    });

    it('should return "undefined" when no such entity', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      filterFn = (entity: IMockEntity): boolean => entity.id === 'wheteverId';
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      expect(result).toBeUndefined();
    });

    it('should return the only entity that will be added after', async () => {
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity1.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      registry.add(mockEntity1);
      expect(result).toEqual(mockEntity1);
    });

    it('should return the only entity that will be added async after', async () => {
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity1.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      setTimeout(() => registry.add(mockEntity1), 50);
      expect(result).toEqual(mockEntity1);
    });

    it('should return an entity that will be added among others after', async () => {
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      setTimeout(() => registry.add(mockEntity1), 50);
      setTimeout(() => registry.add(mockEntity2), 60);
      setTimeout(() => registry.add(mockEntity3), 40);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added among others after', async () => {
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added after, among the mixed added entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity3.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      registry.add(mockEntity3);
      registry.add(mockEntity4);
      expect(result).toEqual(mockEntity3);
    });

    it('should return an entity that was added before, among the mixed added entities', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      registry.add(mockEntity3);
      registry.add(mockEntity4);
      expect(result).toEqual(mockEntity2);
    });

    it('should return an entity that will be added after, among the mixed async added entities', async () => {
      registry.add(mockEntity1);
      setTimeout(() => registry.add(mockEntity2), 50);
      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity3.id;
      const result: IMockEntity | undefined = await getValueAsync(registry, filterFn);
      registry.add(mockEntity3);
      setTimeout(() => registry.add(mockEntity4), 30);
      expect(result).toEqual(mockEntity3);
    });

    it('should not interfere with other registries ("registryB" should not throw an error)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryA: IAbstractAsyncRegistry<IMockEntity> = AbstractAsyncRegistry<IMockEntity>('mockEntityA' as any);
      registryA.add(mockEntity1);
      registryA.add(mockEntity2);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryB: IAbstractAsyncRegistry<IMockEntity> = AbstractAsyncRegistry<IMockEntity>('mockEntityB' as any);
      registryB.add(mockEntity3);
      registryB.add(mockEntity4);

      filterFn = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result: IMockEntity | undefined = await getValueAsync(registryA, filterFn);
      expect(result).toEqual(mockEntity2);
    });

    it('should perform several consecutive searches', async () => {
      registry.add(mockEntity1);
      const filterFn1 = (entity: IMockEntity): boolean => entity.id === mockEntity1.id;
      const result1: IMockEntity | undefined = await getValueAsync(registry, filterFn1);
      registry.add(mockEntity2);
      expect(result1).toEqual(mockEntity1);

      registry.add(mockEntity3);
      const filterFn2 = (entity: IMockEntity): boolean => entity.id === mockEntity3.id;
      const result2: IMockEntity | undefined = await getValueAsync(registry, filterFn2);
      registry.add(mockEntity4);
      expect(result2).toEqual(mockEntity3);

      registry.add(mockEntity5);
      const filterFn3 = (entity: IMockEntity): boolean => entity.id === mockEntity5.id;
      const result3: IMockEntity | undefined = await getValueAsync(registry, filterFn3);
      registry.add(mockEntity6);
      expect(result3).toEqual(mockEntity5);
    });

    it('should return undefined when an entity was removed from registry', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn1 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result1: IMockEntity | undefined = await getValueAsync(registry, filterFn1);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity2.id);
      const filterFn2 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result2: IMockEntity | undefined = await getValueAsync(registry, filterFn2);
      expect(result2).toBeUndefined();
    });

    it('should return an entity which was removed from registry and added again', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn1 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result1: IMockEntity | undefined = await getValueAsync(registry, filterFn1);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity2.id);
      const filterFn2 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result2: IMockEntity | undefined = await getValueAsync(registry, filterFn2);
      expect(result2).toBeUndefined();

      const filterFn3 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result3: IMockEntity | undefined = await getValueAsync(registry, filterFn3);
      expect(result3).toEqual(mockEntity2);
    });

    it('should return an entity when another entity was removed from registry', async () => {
      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);
      const filterFn1 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result1: IMockEntity | undefined = await getValueAsync(registry, filterFn1);
      expect(result1).toEqual(mockEntity2);

      registry.remove(mockEntity1.id);
      const filterFn2 = (entity: IMockEntity): boolean => entity.id === mockEntity2.id;
      const result2: IMockEntity | undefined = await getValueAsync(registry, filterFn2);
      expect(result2).toEqual(mockEntity2);
    });
  });
});
