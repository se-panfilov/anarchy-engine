import { firstValueFrom } from 'rxjs';
import { expect } from 'vitest';

import type { RegistryType, TAbstractAsyncRegistry, TAbstractEntityRegistry } from '@/Engine/Abstract';
import { AbstractAsyncRegistry, AbstractEntityRegistry, LookUpStrategy } from '@/Engine/Abstract';
import type { TRegistrable } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins';

import {
  getAsyncUniqEntityByNameAsync,
  getAsyncUniqEntityWithTag,
  getUniqEntityByName$,
  getUniqEntityWithTag$,
  getUniqEntityWithTags$,
  getUniqEntityWithTagsAsync,
  getValueAsync,
  subscribeToValue$
} from './RegistryAsyncUtils';

const mockEntity1: TRegistrable = { id: 'mockEntityId1', name: 'mockEntity1' } as unknown as TRegistrable;
const mockEntity2: TRegistrable = { id: 'mockEntityId2', name: 'mockEntity2' } as unknown as TRegistrable;
const mockEntity3: TRegistrable = { id: 'mockEntityId3', name: 'mockEntity3' } as unknown as TRegistrable;
const mockEntity4: TRegistrable = { id: 'mockEntityId4', name: 'mockEntity4' } as unknown as TRegistrable;
const mockEntity5: TRegistrable = { id: 'mockEntityId5', name: 'mockEntity5' } as unknown as TRegistrable;
const mockEntity6: TRegistrable = { id: 'mockEntityId6', name: 'mockEntity6' } as unknown as TRegistrable;

describe('RegistryAsyncUtils', () => {
  const waitingTime: number = 100;

  const tagA: string = 'tagA';
  const tagB: string = 'tagB';
  const tagC: string = 'tagC';
  const tagD: string = 'tagD';
  const tagE: string = 'tagE';
  const tagUniq1: string = 'tagUniq1';
  const tagUniq2: string = 'tagUniq2';

  const obj1AB: TRegistrable = { id: 'obj1AB', ...withTagsMixin([tagA, tagB]) };
  const obj2B: TRegistrable = { id: 'obj2B', ...withTagsMixin([tagB]) };
  const obj3CD: TRegistrable = { id: 'obj3CD', ...withTagsMixin([tagC, tagD]) };
  const obj4BE: TRegistrable = { id: 'obj4BE', ...withTagsMixin([tagB, tagE]) };
  const obj5None: TRegistrable = { id: 'obj5None', ...withTagsMixin([]) };
  const obj6ABE: TRegistrable = { id: 'obj6ABE', ...withTagsMixin([tagA, tagB, tagE]) };
  const obj7EB: TRegistrable = { id: 'obj7EB', ...withTagsMixin([tagE, tagB]) };
  const obj8Uniq1: TRegistrable = { id: 'obj8Uniq1', ...withTagsMixin([tagUniq1]) };
  const obj9Uniq2: TRegistrable = { id: 'obj9Uniq2', ...withTagsMixin([tagD, tagUniq2, tagC, tagE]) };

  let registryAsync: TAbstractAsyncRegistry<TRegistrable>;
  let registrySync: TAbstractEntityRegistry<TRegistrable>;

  beforeEach(() => {
    registryAsync = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
    registryAsync.add(obj1AB);
    registryAsync.add(obj2B);
    registryAsync.add(obj3CD);
    registryAsync.add(obj4BE);
    registryAsync.add(obj5None);
    registryAsync.add(obj6ABE);
    registryAsync.add(obj7EB);
    registryAsync.add(obj8Uniq1);
    registryAsync.add(obj9Uniq2);

    registrySync = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
    registrySync.add(obj1AB);
    registrySync.add(obj2B);
    registrySync.add(obj3CD);
    registrySync.add(obj4BE);
    registrySync.add(obj5None);
    registrySync.add(obj6ABE);
    registrySync.add(obj7EB);
    registrySync.add(obj8Uniq1);
    registrySync.add(obj9Uniq2);
  });

  describe('getUniqEntityWithTagsAsync', () => {
    describe('entities added before the search', () => {
      describe('LookUpStrategy "every"', () => {
        it('should return an uniq object that contains multiple tags', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains multiple tags for Sync registry', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registrySync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains a single tag', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq1], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj8Uniq1);
        }, 100);

        it('should return "undefined" if the entity is not in the registryAsync', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          registryAsync.add(obj3CD);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 100);

        it('should return "undefined" if the entity is not in the registryAsync and the entity in the registryAsync has an empty tags list', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          registryAsync.add(obj5None);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 100);

        it('should return an empty array if the registryAsync is empty', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType), LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 100);
      });

      describe('LookUpStrategy "some"', () => {
        it('should return an uniq object that contains at least one tag', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registryAsync, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains at least one tag for Sync registry', async () => {
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registrySync, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });
    });

    describe('entities added async (after the search)', () => {
      describe('LookUpStrategy "every"', () => {
        it('should return an uniq object that contains multiple tags', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registryAsync.add(obj1AB), 20);
          setTimeout(() => registryAsync.add(obj2B), 20);
          setTimeout(() => registryAsync.add(obj3CD), 20);
          setTimeout(() => registryAsync.add(obj4BE), 20);
          setTimeout(() => registryAsync.add(obj5None), 20);
          setTimeout(() => registryAsync.add(obj6ABE), 20);
          setTimeout(() => registryAsync.add(obj7EB), 20);
          setTimeout(() => registryAsync.add(obj8Uniq1), 20);
          setTimeout(() => registryAsync.add(obj9Uniq2), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains multiple tags for Sync registry', async () => {
          const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registrySync.add(obj1AB), 20);
          setTimeout(() => registrySync.add(obj2B), 20);
          setTimeout(() => registrySync.add(obj3CD), 20);
          setTimeout(() => registrySync.add(obj4BE), 20);
          setTimeout(() => registrySync.add(obj5None), 20);
          setTimeout(() => registrySync.add(obj6ABE), 20);
          setTimeout(() => registrySync.add(obj7EB), 20);
          setTimeout(() => registrySync.add(obj8Uniq1), 20);
          setTimeout(() => registrySync.add(obj9Uniq2), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, tagC], registrySync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains a single tag', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registryAsync.add(obj1AB), 20);
          setTimeout(() => registryAsync.add(obj2B), 20);
          setTimeout(() => registryAsync.add(obj3CD), 20);
          setTimeout(() => registryAsync.add(obj4BE), 20);
          setTimeout(() => registryAsync.add(obj5None), 20);
          setTimeout(() => registryAsync.add(obj6ABE), 20);
          setTimeout(() => registryAsync.add(obj7EB), 20);
          setTimeout(() => registryAsync.add(obj8Uniq1), 20);
          setTimeout(() => registryAsync.add(obj9Uniq2), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq1], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toEqual(obj8Uniq1);
        }, 100);

        it('should return "undefined" if the entity is not in the registryAsync', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registryAsync.add(obj3CD), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 100);

        it('should return "undefined" if the entity is not in the registryAsync and the entity in the registryAsync has an empty tags list', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registryAsync.add(obj5None), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagB], registryAsync, LookUpStrategy.Every, waitingTime);
          expect(result).toBeUndefined();
        }, 100);
      });

      describe('LookUpStrategy "some"', () => {
        it('should return an uniq object that contains at least one tag', async () => {
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registryAsync.add(obj1AB), 20);
          setTimeout(() => registryAsync.add(obj2B), 20);
          setTimeout(() => registryAsync.add(obj3CD), 20);
          setTimeout(() => registryAsync.add(obj4BE), 20);
          setTimeout(() => registryAsync.add(obj5None), 20);
          setTimeout(() => registryAsync.add(obj6ABE), 20);
          setTimeout(() => registryAsync.add(obj7EB), 20);
          setTimeout(() => registryAsync.add(obj8Uniq1), 20);
          setTimeout(() => registryAsync.add(obj9Uniq2), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registryAsync, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an uniq object that contains at least one tag for Sync registry', async () => {
          const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
          setTimeout(() => registrySync.add(obj1AB), 20);
          setTimeout(() => registrySync.add(obj2B), 20);
          setTimeout(() => registrySync.add(obj3CD), 20);
          setTimeout(() => registrySync.add(obj4BE), 20);
          setTimeout(() => registrySync.add(obj5None), 20);
          setTimeout(() => registrySync.add(obj6ABE), 20);
          setTimeout(() => registrySync.add(obj7EB), 20);
          setTimeout(() => registrySync.add(obj8Uniq1), 20);
          setTimeout(() => registrySync.add(obj9Uniq2), 20);
          const result: TRegistrable | undefined = await getUniqEntityWithTagsAsync([tagUniq2, 'asdsd', 'eeee'], registrySync, LookUpStrategy.Some, waitingTime);
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });
    });
  });

  describe('getAsyncUniqEntityWithTag', () => {
    describe('entities added before the search', () => {
      it('should return an uniq object that contains a tag', async () => {
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registryAsync, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 100);

      it('should return an uniq object that contains a tag from a Sync registry', async () => {
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registrySync, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 100);

      it('should return an empty array if the registryAsync is empty', async () => {
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType), waitingTime);
        expect(result).toBeUndefined();
      }, 100);

      it('should return "undefined" if the entity is not in the registryAsync', async () => {
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        registryAsync.add(obj3CD);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registryAsync, waitingTime);
        expect(result).toBeUndefined();
      }, 100);

      it('should return "undefined" if the entity is not in the registryAsync and the entity in the registryAsync has an empty tags list', async () => {
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        registryAsync.add(obj5None);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registryAsync, waitingTime);
        expect(result).toBeUndefined();
      }, 100);
    });

    describe('entities added async (after the search)', () => {
      it('should return an uniq object that contains a tag', async () => {
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registryAsync.add(obj1AB), 20);
        setTimeout(() => registryAsync.add(obj2B), 20);
        setTimeout(() => registryAsync.add(obj3CD), 20);
        setTimeout(() => registryAsync.add(obj4BE), 20);
        setTimeout(() => registryAsync.add(obj5None), 20);
        setTimeout(() => registryAsync.add(obj6ABE), 20);
        setTimeout(() => registryAsync.add(obj7EB), 20);
        setTimeout(() => registryAsync.add(obj8Uniq1), 20);
        setTimeout(() => registryAsync.add(obj9Uniq2), 20);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registryAsync, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 100);

      it('should return an uniq object that contains a tag from Sync registry', async () => {
        const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registrySync.add(obj1AB), 20);
        setTimeout(() => registrySync.add(obj2B), 20);
        setTimeout(() => registrySync.add(obj3CD), 20);
        setTimeout(() => registrySync.add(obj4BE), 20);
        setTimeout(() => registrySync.add(obj5None), 20);
        setTimeout(() => registrySync.add(obj6ABE), 20);
        setTimeout(() => registrySync.add(obj7EB), 20);
        setTimeout(() => registrySync.add(obj8Uniq1), 20);
        setTimeout(() => registrySync.add(obj9Uniq2), 20);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagUniq1, registrySync, waitingTime);
        expect(result).toEqual(obj8Uniq1);
      }, 100);

      it('should return an empty array if the registryAsync is empty', async () => {
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType), waitingTime);
        expect(result).toBeUndefined();
      }, 100);

      it('should return "undefined" if the entity is not in the registryAsync', async () => {
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registryAsync.add(obj3CD), 20);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registryAsync, waitingTime);
        expect(result).toBeUndefined();
      }, 100);

      it('should return "undefined" if the entity is not in the registryAsync and the entity in the registryAsync has an empty tags list', async () => {
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        setTimeout(() => registryAsync.add(obj5None), 20);
        const result: TRegistrable | undefined = await getAsyncUniqEntityWithTag(tagB, registryAsync, waitingTime);
        expect(result).toBeUndefined();
      }, 100);
    });
  });

  describe('getAsyncUniqEntityByNameAsync', () => {
    it('should return an uniq object that contains a name', async () => {
      const name: string = 'john';
      const objJohn: TRegistrable = { id: 'j12', name, ...withTagsMixin([]) };
      setTimeout(() => registryAsync.add(objJohn), 20);
      const result: TRegistrable | undefined = await getAsyncUniqEntityByNameAsync(name, registryAsync, waitingTime);
      expect(result).toEqual(objJohn);
    }, 100);

    it('should return an uniq object that contains a name from Sync registry', async () => {
      const name: string = 'john';
      const objJohn: TRegistrable = { id: 'j12', name, ...withTagsMixin([]) };
      setTimeout(() => registrySync.add(objJohn), 20);
      const result: TRegistrable | undefined = await getAsyncUniqEntityByNameAsync(name, registrySync, waitingTime);
      expect(result).toEqual(objJohn);
    }, 100);

    it('should return an empty array if the registryAsync is empty', async () => {
      const result: TRegistrable | undefined = await getAsyncUniqEntityByNameAsync('some', AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType), waitingTime);
      expect(result).toBeUndefined();
    }, 100);

    it('should return "undefined" if the entity is not in the registryAsync', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(obj3CD);
      const result: TRegistrable | undefined = await getAsyncUniqEntityByNameAsync('some', registryAsync, waitingTime);
      expect(result).toBeUndefined();
    }, 100);
  });

  describe('getValueAsync', () => {
    it('should return an entity that was added sync before getting the value', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return an entity that was added sync before getting the value from Sync registry', async () => {
      const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
      registrySync.add(mockEntity1);
      registrySync.add(mockEntity2);
      registrySync.add(mockEntity3);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registrySync, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return an entity that was added async before getting the value', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      setTimeout(() => registryAsync.add(mockEntity2), 20);
      registryAsync.add(mockEntity3);
      setTimeout(() => registryAsync.add(mockEntity4), 20);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return "undefined" when no such entity', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);
      const filterFn = (entity: TRegistrable): boolean => entity.id === 'wheteverId';
      const promise: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      setTimeout(() => registryAsync.add(mockEntity4), 20);
      setTimeout(() => registryAsync.add(mockEntity5), 20);
      const result: TRegistrable | undefined = await promise;
      expect(result).toBeUndefined();
    }, 100);

    it('should return an entity that will be added after getting the value', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const promise: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn, undefined, 65);
      registryAsync.add(mockEntity1);
      setTimeout(() => registryAsync.add(mockEntity2), 25);
      setTimeout(() => registryAsync.add(mockEntity3), 15);
      const result: TRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return an entity that will be added after getting the value, among the mixed added entities', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      setTimeout(() => registryAsync.add(mockEntity2), 25);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity3.id;
      const promise: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      registryAsync.add(mockEntity3);
      setTimeout(() => registryAsync.add(mockEntity4), 25);
      const result: TRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity3);
    }, 100);

    it('should return an entity that was added before getting the value but async, among the mixed added entities', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      setTimeout(() => registryAsync.add(mockEntity2), 25);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      registryAsync.add(mockEntity3);
      setTimeout(() => registryAsync.add(mockEntity4), 25);
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return an entity that will be added after getting the value, among the mixed async added entities', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      setTimeout(() => registryAsync.add(mockEntity2), 20);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity3.id;
      const promise: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn, undefined, 65);
      registryAsync.add(mockEntity3);
      setTimeout(() => registryAsync.add(mockEntity4), 30);
      const result: TRegistrable | undefined = await promise;
      expect(result).toEqual(mockEntity3);
    }, 100);

    it('should not interfere with other registries ("registryB" should not throw an error)', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryA: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryA.add(mockEntity1);
      setTimeout(() => registryA.add(mockEntity2), 25);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const registryB: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntityB' as any);
      registryB.add(mockEntity3);
      setTimeout(() => registryB.add(mockEntity4), 25);

      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registryA, filterFn, undefined, waitingTime);
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should perform several consecutive searches', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      const filterFn1 = (entity: TRegistrable): boolean => entity.id === mockEntity1.id;
      const result1: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn1, undefined, waitingTime);
      registryAsync.add(mockEntity2);
      expect(result1).toEqual(mockEntity1);

      registryAsync.add(mockEntity3);
      const filterFn2 = (entity: TRegistrable): boolean => entity.id === mockEntity3.id;
      const result2: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn2, undefined, waitingTime);
      registryAsync.add(mockEntity4);
      expect(result2).toEqual(mockEntity3);

      registryAsync.add(mockEntity5);
      const filterFn3 = (entity: TRegistrable): boolean => entity.id === mockEntity5.id;
      const result3: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn3, undefined, waitingTime);
      registryAsync.add(mockEntity6);
      expect(result3).toEqual(mockEntity5);
    }, 100);

    it('should perform several consecutive async searches', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      setTimeout(() => registryAsync.add(mockEntity1), 25);
      const filterFn1 = (entity: TRegistrable): boolean => entity.id === mockEntity1.id;
      const result1: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn1, undefined, waitingTime);
      setTimeout(() => registryAsync.add(mockEntity2), 25);
      expect(result1).toEqual(mockEntity1);

      setTimeout(() => registryAsync.add(mockEntity3), 25);
      const filterFn2 = (entity: TRegistrable): boolean => entity.id === mockEntity3.id;
      const result2: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn2, undefined, waitingTime);
      setTimeout(() => registryAsync.add(mockEntity4), 25);
      expect(result2).toEqual(mockEntity3);

      setTimeout(() => registryAsync.add(mockEntity5), 25);
      const filterFn3 = (entity: TRegistrable): boolean => entity.id === mockEntity5.id;
      const result3: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn3, undefined, waitingTime);
      setTimeout(() => registryAsync.add(mockEntity6), 25);
      expect(result3).toEqual(mockEntity5);
    }, 100);

    it('should perform several parallel searches', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      const filterFn1 = (entity: TRegistrable): boolean => entity.id === mockEntity1.id;
      const filterFn2 = (entity: TRegistrable): boolean => entity.id === mockEntity3.id;
      const filterFn3 = (entity: TRegistrable): boolean => entity.id === mockEntity5.id;

      setTimeout(() => registryAsync.add(mockEntity2), 20);
      setTimeout(() => registryAsync.add(mockEntity3), 15);
      setTimeout(() => registryAsync.add(mockEntity4), 20);

      const promise1: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn1, undefined, waitingTime);
      const promise2: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn2, undefined, waitingTime);
      const promise3: Promise<TRegistrable | undefined> = getValueAsync(registryAsync, filterFn3, undefined, waitingTime);

      setTimeout(() => registryAsync.add(mockEntity5), 10);
      setTimeout(() => registryAsync.add(mockEntity6), 25);

      const result1: TRegistrable | undefined = await promise1;
      expect(result1).toEqual(mockEntity1);

      const result2: TRegistrable | undefined = await promise2;
      expect(result2).toEqual(mockEntity3);

      const result3: TRegistrable | undefined = await promise3;
      expect(result3).toEqual(mockEntity5);
    }, 100);

    it('should return an "undefined" when the entity was removed from registryAsync', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);
      const filterFn1 = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result1: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn1, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registryAsync.remove(mockEntity2.id);

      const filterFn2 = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result2: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn2, undefined, waitingTime);
      expect(result2).toBeUndefined();
    }, 1000);

    it('should return an entity which was removed from registryAsync and added again', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;

      const result1: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registryAsync.remove(mockEntity2.id);

      const result2: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      expect(result2).toBeUndefined();

      registryAsync.add(mockEntity2);
      const result3: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, waitingTime);
      expect(result3).toEqual(mockEntity2);
    }, 200);

    it('should return an entity when another entity was removed from registryAsync', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);
      const filterFn1 = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result1: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn1, undefined, waitingTime);
      expect(result1).toEqual(mockEntity2);

      registryAsync.remove(mockEntity1.id);
      const filterFn2 = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result2: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn2, undefined, waitingTime);
      expect(result2).toEqual(mockEntity2);
    }, 100);

    it('should return an "undefined" when the waiting time is exceeded', async () => {
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity3);
      setTimeout(() => registryAsync.add(mockEntity2), 20);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;
      const result: TRegistrable | undefined = await getValueAsync(registryAsync, filterFn, undefined, 10);
      expect(result).toBeUndefined();
    }, 100);
  });

  describe('subscribeToValue$', () => {
    it('should return an entity that was added sync before getting the value', async () => {
      // setup
      const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;

      // execute
      const subscription$ = firstValueFrom(subscribeToValue$(registryAsync, filterFn));

      registryAsync.add(mockEntity1);
      registryAsync.add(mockEntity2);
      registryAsync.add(mockEntity3);

      // check
      const result: TRegistrable = await subscription$;
      expect(result).toEqual(mockEntity2);
    }, 100);

    it('should return an entity that was added sync before getting the value drom Sync registry', async () => {
      // setup
      const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);
      const filterFn = (entity: TRegistrable): boolean => entity.id === mockEntity2.id;

      // execute
      const subscription$ = firstValueFrom(subscribeToValue$(registrySync, filterFn));

      registrySync.add(mockEntity1);
      registrySync.add(mockEntity2);
      registrySync.add(mockEntity3);

      // check
      const result: TRegistrable = await subscription$;
      expect(result).toEqual(mockEntity2);
    }, 100);
  });

  describe('getUniqEntityWithTags$', () => {
    describe('LookUpStrategy "every"', () => {
      describe('added before subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          registryAsync.add(obj1AB);
          registryAsync.add(obj9Uniq2);
          setTimeout(() => registryAsync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registryAsync, LookUpStrategy.Every));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an entity that was added before getting the value from Sync registry', async () => {
          // setup
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          registryAsync.add(obj1AB);
          registryAsync.add(obj9Uniq2);
          setTimeout(() => registryAsync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registryAsync, LookUpStrategy.Every));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });

      describe('added after subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagUniq2], registryAsync, LookUpStrategy.Every));

          setTimeout(() => registryAsync.add(obj1AB), 20);
          setTimeout(() => registryAsync.add(obj9Uniq2), 20);
          setTimeout(() => registryAsync.add(obj2B), 20);

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });
    });

    describe('LookUpStrategy "some"', () => {
      describe('added before subscription started', () => {
        describe('added after subscription started', () => {
          it('should return an entity that was added before getting the value', async () => {
            // setup
            const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

            registryAsync.add(obj1AB);
            registryAsync.add(obj9Uniq2);
            setTimeout(() => registryAsync.add(obj2B), 20);

            // execute
            const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registryAsync, LookUpStrategy.Some));

            // check
            const result: TRegistrable = await subscription$;
            expect(result).toEqual(obj9Uniq2);
          }, 100);
        });
      });

      describe('added after subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registryAsync, LookUpStrategy.Some));
          // const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagUniq2, tagC, tagE], registryAsync, LookUpStrategy.Every));

          setTimeout(() => registryAsync.add(obj1AB), 20);
          setTimeout(() => registryAsync.add(obj9Uniq2), 20);
          setTimeout(() => registryAsync.add(obj2B), 20);

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an entity that was added before getting the value from Sync registry', async () => {
          // setup
          const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagC], registrySync, LookUpStrategy.Some));
          // const subscription$ = firstValueFrom(getUniqEntityWithTags$([tagD, tagUniq2, tagC, tagE], registryAsync, LookUpStrategy.Every));

          setTimeout(() => registrySync.add(obj1AB), 20);
          setTimeout(() => registrySync.add(obj9Uniq2), 20);
          setTimeout(() => registrySync.add(obj2B), 20);

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });
    });
  });

  describe('getUniqEntityWithTag$', () => {
    describe('added before subscription started', () => {
      describe('added after subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          registryAsync.add(obj1AB);
          registryAsync.add(obj9Uniq2);
          setTimeout(() => registryAsync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTag$(tagD, registryAsync));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);

        it('should return an entity that was added before getting the value from Sync registry', async () => {
          // setup
          const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);

          registrySync.add(obj1AB);
          registrySync.add(obj9Uniq2);
          setTimeout(() => registrySync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityWithTag$(tagD, registrySync));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(obj9Uniq2);
        }, 100);
      });
    });

    describe('added after subscription started', () => {
      it('should return an entity that was added before getting the value', async () => {
        // setup
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

        // execute
        const subscription$ = firstValueFrom(getUniqEntityWithTag$(tagC, registryAsync));
        // const subscription$ = firstValueFrom(getUniqEntityWithTag$([tagD, tagUniq2, tagC, tagE], registryAsync, LookUpStrategy.Every));

        setTimeout(() => registryAsync.add(obj1AB), 20);
        setTimeout(() => registryAsync.add(obj9Uniq2), 20);
        setTimeout(() => registryAsync.add(obj2B), 20);

        // check
        const result: TRegistrable = await subscription$;
        expect(result).toEqual(obj9Uniq2);
      }, 100);
    });
  });

  describe('getUniqEntityByName$', () => {
    describe('added before subscription started', () => {
      describe('added after subscription started', () => {
        it('should return an entity that was added before getting the value', async () => {
          // setup
          const name: string = 'sam';
          const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);

          const expectedResult: TRegistrable = { ...obj9Uniq2, name };

          registryAsync.add(obj1AB);
          registryAsync.add({ ...obj9Uniq2, name });
          setTimeout(() => registryAsync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityByName$(name, registryAsync));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(expectedResult);
        }, 100);

        it('should return an entity that was added before getting the value from Sync registry', async () => {
          // setup
          const name: string = 'sam';
          const registrySync: TAbstractEntityRegistry<TRegistrable> = AbstractEntityRegistry<TRegistrable>('mockEntity' as RegistryType);

          const expectedResult: TRegistrable = { ...obj9Uniq2, name };

          registrySync.add(obj1AB);
          registrySync.add({ ...obj9Uniq2, name });
          setTimeout(() => registrySync.add(obj2B), 20);

          // execute
          const subscription$ = firstValueFrom(getUniqEntityByName$(name, registrySync));

          // check
          const result: TRegistrable = await subscription$;
          expect(result).toEqual(expectedResult);
        }, 100);
      });
    });

    describe('added after subscription started', () => {
      it('should return an entity that was added before getting the value', async () => {
        // setup
        const name: string = 'pete';
        const registryAsync: TAbstractAsyncRegistry<TRegistrable> = AbstractAsyncRegistry<TRegistrable>('mockEntity' as RegistryType);
        const expectedResult: TRegistrable = { ...obj9Uniq2, name };

        // execute
        const subscription$ = firstValueFrom(getUniqEntityByName$(name, registryAsync));

        setTimeout(() => registryAsync.add(obj1AB), 20);
        setTimeout(() => registryAsync.add({ ...obj9Uniq2, name }), 20);
        setTimeout(() => registryAsync.add(obj2B), 20);

        // check
        const result: TRegistrable = await subscription$;
        expect(result).toEqual(expectedResult);
      }, 100);
    });
  });
});
