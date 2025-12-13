import { firstValueFrom } from 'rxjs';
import { expect } from 'vitest';

import type { IAbstractAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import { AbstractAsyncRegistry, LookUpStrategy } from '@/Engine/Abstract';
import type { IRegistrable } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins';

import { getAsyncUniqEntityByNameAsync, getAsyncUniqEntityWithTag, getUniqEntityWithTags$, getUniqEntityWithTagsAsync, getValueAsync, subscribeToValue$ } from './RegistryAsyncUtils';

const mockEntity1: IRegistrable = { id: 'mockEntityId1', name: 'mockEntity1' } as unknown as IRegistrable;
const mockEntity2: IRegistrable = { id: 'mockEntityId2', name: 'mockEntity2' } as unknown as IRegistrable;
const mockEntity3: IRegistrable = { id: 'mockEntityId3', name: 'mockEntity3' } as unknown as IRegistrable;
const mockEntity4: IRegistrable = { id: 'mockEntityId4', name: 'mockEntity4' } as unknown as IRegistrable;
const mockEntity5: IRegistrable = { id: 'mockEntityId5', name: 'mockEntity5' } as unknown as IRegistrable;
const mockEntity6: IRegistrable = { id: 'mockEntityId6', name: 'mockEntity6' } as unknown as IRegistrable;

describe('RegistryAsyncUtils', () => {
  const waitingTime: number = 500;

  const tagA: string = 'tagA';
  const tagB: string = 'tagB';
  const tagC: string = 'tagC';
  const tagD: string = 'tagD';
  const tagE: string = 'tagE';
  const tagUniq1: string = 'tagUniq1';
  const tagUniq2: string = 'tagUniq2';

  const obj1AB: IRegistrable = { id: 'obj1AB', ...withTagsMixin([tagA, tagB]) };
  const obj2B: IRegistrable = { id: 'obj2B', ...withTagsMixin([tagB]) };
  const obj3CD: IRegistrable = { id: 'obj3CD', ...withTagsMixin([tagC, tagD]) };
  const obj4BE: IRegistrable = { id: 'obj4BE', ...withTagsMixin([tagB, tagE]) };
  const obj5None: IRegistrable = { id: 'obj5None', ...withTagsMixin([]) };
  const obj6ABE: IRegistrable = { id: 'obj6ABE', ...withTagsMixin([tagA, tagB, tagE]) };
  const obj7EB: IRegistrable = { id: 'obj7EB', ...withTagsMixin([tagE, tagB]) };
  const obj8Uniq1: IRegistrable = { id: 'obj8Uniq1', ...withTagsMixin([tagUniq1]) };
  const obj9Uniq2: IRegistrable = { id: 'obj9Uniq2', ...withTagsMixin([tagD, tagUniq2, tagC, tagE]) };

  let registry: IAbstractAsyncRegistry<IRegistrable>;

  beforeEach(() => {
    registry = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
    registry.add(obj1AB);
    registry.add(obj2B);
    registry.add(obj3CD);
    registry.add(obj4BE);
    registry.add(obj5None);
    registry.add(obj6ABE);
    registry.add(obj7EB);
    registry.add(obj8Uniq1);
    registry.add(obj9Uniq2);
  });

  // TODO (S.Panfilov) timeout should be configurable
  describe('getUniqEntityWithTagsAsync', () => {
    describe('entities added before the search', () => {
      describe('LookUpStrategy "every"', () => {
        it('should return an uniq object that contains multiple tags', async () => {
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 1000);

        it('should return an uniq object that contains a single tag', async () => {
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq1], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj8Uniq1);
        }, 1000);

        it('should return "undefined" if the entity is not in the registry', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          registry.add(obj3CD);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 1000);

        it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          registry.add(obj5None);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 1000);

        it('should return an empty array if the registry is empty', async () => {
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType), LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 1000);
      });

      describe('LookUpStrategy "some"', () => {
        it('should return an uniq object that contains at least one tag', async () => {
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registry, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 1000);
      });
    });

    describe('entities added async (after the search)', () => {
      describe('LookUpStrategy "every"', () => {
        it('should return an uniq object that contains multiple tags', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registry.add(obj1AB), 50);
          setTimeout(() => registry.add(obj2B), 50);
          setTimeout(() => registry.add(obj3CD), 50);
          setTimeout(() => registry.add(obj4BE), 50);
          setTimeout(() => registry.add(obj5None), 50);
          setTimeout(() => registry.add(obj6ABE), 50);
          setTimeout(() => registry.add(obj7EB), 50);
          setTimeout(() => registry.add(obj8Uniq1), 50);
          setTimeout(() => registry.add(obj9Uniq2), 50);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 1000);

        it('should return an uniq object that contains a single tag', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registry.add(obj1AB), 50);
          setTimeout(() => registry.add(obj2B), 50);
          setTimeout(() => registry.add(obj3CD), 50);
          setTimeout(() => registry.add(obj4BE), 50);
          setTimeout(() => registry.add(obj5None), 50);
          setTimeout(() => registry.add(obj6ABE), 50);
          setTimeout(() => registry.add(obj7EB), 50);
          setTimeout(() => registry.add(obj8Uniq1), 50);
          setTimeout(() => registry.add(obj9Uniq2), 50);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq1], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj8Uniq1);
        }, 1000);

        it('should return "undefined" if the entity is not in the registry', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registry.add(obj3CD), 50);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 1000);

        it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registry.add(obj5None), 50);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registry, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 1000);
      });

      describe('LookUpStrategy "some"', () => {
        it('should return an uniq object that contains at least one tag', async () => {
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registry.add(obj1AB), 50);
          setTimeout(() => registry.add(obj2B), 50);
          setTimeout(() => registry.add(obj3CD), 50);
          setTimeout(() => registry.add(obj4BE), 50);
          setTimeout(() => registry.add(obj5None), 50);
          setTimeout(() => registry.add(obj6ABE), 50);
          setTimeout(() => registry.add(obj7EB), 50);
          setTimeout(() => registry.add(obj8Uniq1), 50);
          setTimeout(() => registry.add(obj9Uniq2), 50);
          const result: IRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registry, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 1000);
      });
    });
  });

  describe('getAsyncUniqEntityWithTag', () => {
    describe('entities added before the search', () => {
      it('should return an uniq object that contains a tag', async () => {
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registry, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 1000);

      it('should return an empty array if the registry is empty', async () => {
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType), waitingTime);
        expect(result).toBeUndefined();
      }, 1000);

      it('should return "undefined" if the entity is not in the registry', async () => {
        const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
        registry.add(obj3CD);
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registry, waitingTime);
        expect(result).toBeUndefined();
      }, 1000);

      it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', async () => {
        const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
        registry.add(obj5None);
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registry, waitingTime);
        expect(result).toBeUndefined();
      }, 1000);
    });

    describe('entities added async (after the search)', () => {
      it('should return an uniq object that contains a tag', async () => {
        const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registry.add(obj1AB), 50);
        setTimeout(() => registry.add(obj2B), 50);
        setTimeout(() => registry.add(obj3CD), 50);
        setTimeout(() => registry.add(obj4BE), 50);
        setTimeout(() => registry.add(obj5None), 50);
        setTimeout(() => registry.add(obj6ABE), 50);
        setTimeout(() => registry.add(obj7EB), 50);
        setTimeout(() => registry.add(obj8Uniq1), 50);
        setTimeout(() => registry.add(obj9Uniq2), 50);
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registry, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 1000);

      it('should return an empty array if the registry is empty', async () => {
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType), waitingTime);
        expect(result).toBeUndefined();
      }, 1000);

      it('should return "undefined" if the entity is not in the registry', async () => {
        const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registry.add(obj3CD), 50);
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registry, waitingTime);
        expect(result).toBeUndefined();
      }, 1000);

      it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', async () => {
        const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registry.add(obj5None), 50);
        const result: IRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registry, waitingTime);
        expect(result).toBeUndefined();
      }, 1000);
    });
  });

  describe('getAsyncUniqEntityByNameAsync', () => {
    it('should return an uniq object that contains a name', async () => {
      const name: string = 'john';
      const objJohn: IRegistrable = { id: 'j12', name, ...withTagsMixin([]) };
      setTimeout(() => registry.add(objJohn), 50);
      const result: IRegistrable | undefined = await getAsyncUniqEntityByNameAsync(name, registry, waitingTime);
      expect(result).toEqual(objJohn);
    }, 1000);

    it('should return an empty array if the registry is empty', async () => {
      const result: IRegistrable | undefined = await getAsyncUniqEntityByNameAsync('some', AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType), waitingTime);
      expect(result).toBeUndefined();
    }, 1000);

    it('should return "undefined" if the entity is not in the registry', async () => {
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      registry.add(obj3CD);
      const result: IRegistrable | undefined = await getAsyncUniqEntityByNameAsync('some', registry, waitingTime);
      expect(result).toBeUndefined();
    }, 1000);
  });

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

  describe('subscribeToValue$', () => {
    it('should return an entity that was added sync before getting the value', async () => {
      // setup
      const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);
      const filterFn = (entity: IRegistrable): boolean => entity.id === mockEntity2.id;

      // execute
      const subscription$ = firstValueFrom(subscribeToValue$(registry, filterFn));

      registry.add(mockEntity1);
      registry.add(mockEntity2);
      registry.add(mockEntity3);

      // check
      const result: IRegistrable = await subscription$;
      expect(result).toEqual(mockEntity2);
    }, 1000);
  });

  describe('getUniqEntityWithTags$', () => {
    describe('LookUpStrategy "every"', () => {
      describe('added before subscription started', () => {
        describe('added after subscription started', () => {
          it('should return an entity that was added before getting the value', async () => {
            // setup
            const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);

            registry.add(obj1AB);
            registry.add(obj9Uniq2);
            setTimeout(() => registry.add(obj2B), 50);

            // execute
            const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registry, LookUpStrategy.Every));
            // const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagUniq2, tagC, tagE], registry, LookUpStrategy.Every));

            // check
            const result: IRegistrable = await subscription$;
            expect(result).toEqual(obj9Uniq2);
          }, 1000);
        });
      });

      describe('added after subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const registry: IAbstractAsyncRegistry<IRegistrable> = AbstractAsyncRegistry<IRegistrable>('mockEntity' as RegistryType);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registry, LookUpStrategy.Every));
          // const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagUniq2, tagC, tagE], registry, LookUpStrategy.Every));

          setTimeout(() => registry.add(obj1AB), 50);
          setTimeout(() => registry.add(obj9Uniq2), 50);
          setTimeout(() => registry.add(obj2B), 50);

          // check
          const result: IRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 1000);
      });
    });
  });
});
