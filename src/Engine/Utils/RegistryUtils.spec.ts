import { expect } from 'vitest';

import { LookUpStrategy } from 'src/Engine/Abstract/Registries';
import type { ICameraRegistry, ICameraWrapper } from '@/Engine/Camera';
import { CameraRegistry, CameraWrapper } from '@/Engine/Camera';
import type { IRegistrable } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics/WithTagsMixin';
import type { ISceneRegistry, ISceneWrapper } from '@/Engine/Scene';
import { SceneRegistry, SceneWrapper } from '@/Engine/Scene';

import { getAllEntitiesWithTag, getAllEntitiesWithTags, getUniqEntityWithTag, getUniqEntityWithTags, setActiveWrappedEntity, shouldHaveTags } from './RegistryUtils';

describe('RegistryUtils', () => {
  const tagA: string = 'tagA';
  const tagB: string = 'tagB';
  const tagC: string = 'tagC';
  const tagD: string = 'tagD';
  const tagE: string = 'tagE';
  const tagUniq1: string = 'tagUniq1';
  const tagUniq2: string = 'tagUniq2';

  const obj1AB: IRegistrable = { id: '1', ...withTagsMixin([tagA, tagB]) };
  const obj2B: IRegistrable = { id: '2', ...withTagsMixin([tagB]) };
  const obj3CD: IRegistrable = { id: '3', ...withTagsMixin([tagC, tagD]) };
  const obj4BE: IRegistrable = { id: '4', ...withTagsMixin([tagB, tagE]) };
  const obj5None: IRegistrable = { id: '5', ...withTagsMixin([]) };
  const obj6ABE: IRegistrable = { id: '6', ...withTagsMixin([tagA, tagB, tagE]) };
  const obj7EB: IRegistrable = { id: '7', ...withTagsMixin([tagE, tagB]) };
  const obj8Uniq1: IRegistrable = { id: '8', ...withTagsMixin([tagUniq1]) };
  const obj9Uniq2: IRegistrable = { id: '9', ...withTagsMixin([tagD, tagUniq2, tagC, tagE]) };

  const registry: Map<string, IRegistrable> = new Map();
  registry.set('obj1AB', obj1AB);
  registry.set('obj2B', obj2B);
  registry.set('obj3CD', obj3CD);
  registry.set('obj4BE', obj4BE);
  registry.set('obj5None', obj5None);
  registry.set('obj6ABE', obj6ABE);
  registry.set('obj7EB', obj7EB);
  registry.set('obj8Uniq1', obj8Uniq1);
  registry.set('obj9Uniq2', obj9Uniq2);

  describe('getAllEntitiesWithTags every', () => {
    describe('LookUpStrategy "every"', () => {
      it('should return all object that contains multiple tags', () => {
        expect(getAllEntitiesWithTags([tagB, tagE], registry, LookUpStrategy.Every)).toEqual([obj4BE, obj6ABE, obj7EB]);
      });

      it('should return all object that contains a single tag', () => {
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Every)).toEqual([obj1AB, obj2B, obj4BE, obj6ABE, obj7EB]);
      });

      it('should return an empty array if the entity is not in the registry', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Every)).toEqual([]);
      });

      it('should return an empty array if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Every)).toEqual([]);
      });

      it('should return an empty array if NO tagList is provided', () => {
        expect(getAllEntitiesWithTags([], registry, LookUpStrategy.Every)).toEqual([]);
      });

      it('should return an empty array if the registry is empty', () => {
        expect(getAllEntitiesWithTags([tagB, tagE], new Map(), LookUpStrategy.Every)).toEqual([]);
      });
    });

    describe('LookUpStrategy "some"', () => {
      it('should return all object that contains multiple tags', () => {
        expect(getAllEntitiesWithTags([tagB, tagE], registry, LookUpStrategy.Some)).toEqual([obj1AB, obj2B, obj4BE, obj6ABE, obj7EB, obj9Uniq2]);
      });

      it('should return all object that contains a single tag', () => {
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Some)).toEqual([obj1AB, obj2B, obj4BE, obj6ABE, obj7EB]);
      });

      it('should return an empty array if no tagList is provided', () => {
        expect(getAllEntitiesWithTags([], registry, LookUpStrategy.Some)).toEqual([]);
      });

      it('should return an empty array if the entity is not in the registry', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Some)).toEqual([]);
      });

      it('should return an empty array if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Some)).toEqual([]);
      });

      it('should return an empty array if the registry is empty', () => {
        expect(getAllEntitiesWithTags([tagB, tagE], new Map(), LookUpStrategy.Some)).toEqual([]);
      });
    });
  });

  describe('getAllEntitiesWithTag', () => {
    it('should return all object that contains multiple tags', () => {
      expect(getAllEntitiesWithTag(tagB, registry)).toEqual([obj1AB, obj2B, obj4BE, obj6ABE, obj7EB]);
    });

    it('should return an empty array if the registry is empty', () => {
      expect(getAllEntitiesWithTag(tagB, new Map())).toEqual([]);
    });
  });

  describe('getUniqEntityWithTags', () => {
    describe('LookUpStrategy "every"', () => {
      it('should return an uniq object that contains multiple tags', () => {
        expect(getUniqEntityWithTags([tagUniq2, tagC], registry, LookUpStrategy.Every)).toEqual(obj9Uniq2);
      });

      it('should return an uniq object that contains a single tag', () => {
        expect(getUniqEntityWithTags([tagUniq1], registry, LookUpStrategy.Every)).toEqual(obj8Uniq1);
      });

      it('should return "undefined" if the entity is not in the registry', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getUniqEntityWithTags([tagB], registry, LookUpStrategy.Every)).toBeUndefined();
      });

      it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(getUniqEntityWithTags([tagB], registry, LookUpStrategy.Every)).toBeUndefined();
      });

      it('should return an empty array if the registry is empty', () => {
        expect(getUniqEntityWithTags([tagB], new Map(), LookUpStrategy.Every)).toBeUndefined();
      });
    });

    describe('LookUpStrategy "some"', () => {
      it('should return an uniq object that contains at least one tag tag', () => {
        expect(getUniqEntityWithTags([tagUniq2, 'asdsd', 'eeee'], registry, LookUpStrategy.Some)).toEqual(obj9Uniq2);
      });
    });
  });

  describe('getUniqEntityWithTag', () => {
    it('should return an uniq object that contains a tag', () => {
      expect(getUniqEntityWithTag(tagUniq1, registry)).toEqual(obj8Uniq1);
    });

    it('should return an empty array if the registry is empty', () => {
      expect(getUniqEntityWithTag(tagB, new Map())).toBeUndefined();
    });

    it('should return "undefined" if the entity is not in the registry', () => {
      const registry: Map<string, IRegistrable> = new Map();
      registry.set('obj3CD', obj3CD);
      expect(getUniqEntityWithTag(tagB, registry)).toBeUndefined();
    });

    it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
      const registry: Map<string, IRegistrable> = new Map();
      registry.set('obj5None', obj5None);
      expect(getUniqEntityWithTag(tagB, registry)).toBeUndefined();
    });
  });

  describe('setActiveWrappedEntity', () => {
    it('should set "isActive" to "true" for an entity', () => {
      const mockObj: ISceneWrapper = SceneWrapper({ name: 'mock-scene', isActive: false, tags: [] });
      const registry: ISceneRegistry = SceneRegistry();
      registry.add(mockObj);
      setActiveWrappedEntity(registry, mockObj.id);
      expect(mockObj.isActive()).toBe(true);
    });

    it('should set "isActive" to "true" for an entity in a registry', () => {
      const mockObj: ICameraWrapper = CameraWrapper({ name: 'mock-camera', isActive: false, tags: [] });
      const registry: ICameraRegistry = CameraRegistry();
      registry.add(mockObj);
      setActiveWrappedEntity(registry, mockObj.id);
      expect(registry.find((w: ICameraWrapper): boolean => w.id === mockObj.id)?.isActive()).toBe(true);
    });

    it('should set "isActive" to "false" for all entities in a registry but the target entity', () => {
      const mockObj1: ISceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: true, tags: [] });
      const mockObj2: ISceneWrapper = SceneWrapper({ name: 'mock-scene-2', isActive: false, tags: [] });
      const mockObjTarget: ISceneWrapper = SceneWrapper({ name: 'mock-scene-target', isActive: false, tags: [] });
      const registry: ISceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObjTarget);
      registry.add(mockObj2);
      setActiveWrappedEntity(registry, mockObjTarget.id);
      expect(registry.find((w: ISceneWrapper): boolean => w.id === mockObj1.id)?.isActive()).toBe(false);
      expect(registry.find((w: ISceneWrapper): boolean => w.id === mockObj2.id)?.isActive()).toBe(false);
      expect(registry.find((w: ISceneWrapper): boolean => w.id === mockObjTarget.id)?.isActive()).toBe(true);
    });

    it('should change "isActive" status of entities', () => {
      const mockObj1: ISceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: true, tags: [] });
      const mockObjTarget: ISceneWrapper = SceneWrapper({ name: 'mock-scene-target', isActive: false, tags: [] });
      const registry: ISceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObjTarget);
      setActiveWrappedEntity(registry, mockObjTarget.id);
      expect(registry.find((w: ISceneWrapper): boolean => w.id === mockObj1.id)?.isActive()).toBe(false);
      expect(registry.find((w: ISceneWrapper): boolean => w.id === mockObjTarget.id)?.isActive()).toBe(true);
    });

    it('should return an active entity', () => {
      const mockObj1: ISceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: false, tags: [] });
      const mockObj2: ISceneWrapper = SceneWrapper({ name: 'mock-scene-2', isActive: false, tags: [] });
      const mockObj3: ISceneWrapper = SceneWrapper({ name: 'mock-scene-3', isActive: false, tags: [] });
      const registry: ISceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObj2);
      registry.add(mockObj3);
      const result: ISceneWrapper = setActiveWrappedEntity(registry, mockObj2.id);
      expect(result).toEqual(mockObj2);
    });

    it('should throw an error if no entity with such id', () => {
      const mockObj1: ISceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: false, tags: [] });
      const registry: ISceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      expect(() => setActiveWrappedEntity(registry, 'whatever-id')).toThrow();
    });
  });

  describe('shouldHaveTags every', () => {
    describe('LookUpStrategy "every"', () => {
      it('should return "true" if object contains multiple tags', () => {
        expect(shouldHaveTags(obj4BE, [tagB, tagE], LookUpStrategy.Every)).toBe(true);
      });

      it('should return "true" if object contains a single tags', () => {
        expect(shouldHaveTags(obj4BE, [tagB], LookUpStrategy.Every)).toBe(true);
      });

      it('should return "false" if object contains NO tags', () => {
        expect(shouldHaveTags(obj4BE, [tagA, tagD], LookUpStrategy.Every)).toBe(false);
      });

      it('should return "false" if the entity has no such tags', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(shouldHaveTags(obj5None, [tagB], LookUpStrategy.Every)).toEqual(false);
      });

      it('should return "true" if tagList is empty', () => {
        expect(shouldHaveTags(obj4BE, [], LookUpStrategy.Every)).toEqual(true);
      });
    });

    describe('LookUpStrategy "some"', () => {
      it('should return "true" if object contains multiple tags', () => {
        expect(shouldHaveTags(obj4BE, [tagB, tagE], LookUpStrategy.Some)).toBe(true);
      });

      it('should return "true" if object contains a single tags', () => {
        expect(shouldHaveTags(obj4BE, [tagB], LookUpStrategy.Some)).toBe(true);
      });

      it('should return "false" if object contains NO tags', () => {
        expect(shouldHaveTags(obj4BE, [tagA, tagD], LookUpStrategy.Some)).toBe(false);
      });

      it('should return "false" if the entity has no such tags', () => {
        const registry: Map<string, IRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(shouldHaveTags(obj5None, [tagB], LookUpStrategy.Some)).toEqual(false);
      });

      it('should return "false" if tagList is empty', () => {
        expect(shouldHaveTags(obj4BE, [], LookUpStrategy.Some)).toEqual(false);
      });
    });
  });
});
