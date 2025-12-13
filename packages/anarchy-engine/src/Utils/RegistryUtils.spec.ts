import { LookUpStrategy } from '@Anarchy/Engine/Abstract/Registries';
import type { TAudioService } from '@Anarchy/Engine/Audio';
import type { TAnyCameraWrapper, TCameraRegistry, TPerspectiveCameraWrapper } from '@Anarchy/Engine/Camera';
import { CameraRegistry, CameraType, PerspectiveCameraWrapper } from '@Anarchy/Engine/Camera';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { TRegistrable } from '@Anarchy/Engine/Mixins';
import type { TSceneRegistry, TSceneWrapper } from '@Anarchy/Engine/Scene';
import { SceneRegistry, SceneWrapper } from '@Anarchy/Engine/Scene';
import type { TSpaceCanvas } from '@Anarchy/Engine/Space/Models';
import type { TTransformDriveService } from '@Anarchy/Engine/TransformDrive';
import { BehaviorSubject, Subject } from 'rxjs';
import { Euler, Vector3 } from 'three';
import { describe, expect, it } from 'vitest';

import { getAllEntitiesWithTag, getAllEntitiesWithTags, getUniqEntityWithTag, getUniqEntityWithTags, setActiveWrappedEntity, shouldHaveTags } from './RegistryUtils';

describe('RegistryUtils', () => {
  const tagA: string = 'tagA';
  const tagB: string = 'tagB';
  const tagC: string = 'tagC';
  const tagD: string = 'tagD';
  const tagE: string = 'tagE';
  const tagUniq1: string = 'tagUniq1';
  const tagUniq2: string = 'tagUniq2';

  const obj1AB: TRegistrable = { id: '1', tags: [tagA, tagB], name: 'obj-1-A-B' };
  const obj2B: TRegistrable = { id: '2', tags: [tagB], name: 'obj-2-B' };
  const obj3CD: TRegistrable = { id: '3', tags: [tagC, tagD], name: 'obj-3-C-D' };
  const obj4BE: TRegistrable = { id: '4', tags: [tagB, tagE], name: 'obj-4-B-E' };
  const obj5None: TRegistrable = { id: '5', tags: [], name: 'obj-5-None' };
  const obj6ABE: TRegistrable = { id: '6', tags: [tagA, tagB, tagE], name: 'obj-6-A-B-E' };
  const obj7EB: TRegistrable = { id: '7', tags: [tagE, tagB], name: 'obj-7-E-B' };
  const obj8Uniq1: TRegistrable = { id: '8', tags: [tagUniq1], name: 'obj-8-Uniq-1' };
  const obj9Uniq2: TRegistrable = { id: '9', tags: [tagD, tagUniq2, tagC, tagE], name: 'obj-9-Uniq-2' };

  const registry: Map<string, TRegistrable> = new Map();
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
        const registry: Map<string, TRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Every)).toEqual([]);
      });

      it('should return an empty array if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, TRegistrable> = new Map();
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
        const registry: Map<string, TRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getAllEntitiesWithTags([tagB], registry, LookUpStrategy.Some)).toEqual([]);
      });

      it('should return an empty array if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, TRegistrable> = new Map();
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
        const registry: Map<string, TRegistrable> = new Map();
        registry.set('obj3CD', obj3CD);
        expect(getUniqEntityWithTags([tagB], registry, LookUpStrategy.Every)).toBeUndefined();
      });

      it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
        const registry: Map<string, TRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(getUniqEntityWithTags([tagB], registry, LookUpStrategy.Every)).toBeUndefined();
      });

      it('should return an empty array if the registry is empty', () => {
        expect(getUniqEntityWithTags([tagB], new Map(), LookUpStrategy.Every)).toBeUndefined();
      });
    });

    describe('LookUpStrategy "some"', () => {
      it('should return an uniq object that contains at least one tag tag', () => {
        expect(getUniqEntityWithTags([tagUniq2, 'some_whatever', 'other_whatever'], registry, LookUpStrategy.Some)).toEqual(obj9Uniq2);
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
      const registry: Map<string, TRegistrable> = new Map();
      registry.set('obj3CD', obj3CD);
      expect(getUniqEntityWithTag(tagB, registry)).toBeUndefined();
    });

    it('should return "undefined" if the entity is not in the registry and the entity in the registry has an empty tags list', () => {
      const registry: Map<string, TRegistrable> = new Map();
      registry.set('obj5None', obj5None);
      expect(getUniqEntityWithTag(tagB, registry)).toBeUndefined();
    });
  });

  describe('setActiveWrappedEntity', () => {
    it('should set "isActive" to "true" for an entity', () => {
      const mockObj: TSceneWrapper = SceneWrapper({ name: 'mock-scene', isActive: false });
      const registry: TSceneRegistry = SceneRegistry();
      registry.add(mockObj);
      setActiveWrappedEntity(registry, mockObj.id);
      expect(mockObj.isActive()).toBe(true);
    });

    it('should set "isActive" to "true" for an entity in a registry', () => {
      const container: TContainerDecorator = {
        id: 'mock-container',
        getWidth: vi.fn(),
        getHeight: vi.fn(),
        getRatio: vi.fn((): number => 1),
        startWatch: vi.fn(),
        stopWatch: vi.fn(),
        getAppContainer: vi.fn(),
        getElement: vi.fn(),
        resize$: new BehaviorSubject<DOMRect>(new DOMRect()).asObservable(),
        canvas$: new BehaviorSubject<TSpaceCanvas | undefined>(undefined),
        destroy$: new Subject<void>(),
        fullScreen$: new BehaviorSubject<boolean>(false),
        viewportRect$: new BehaviorSubject(new DOMRect())
      };
      const transformDriveService: TTransformDriveService = { name: 'mock-transform-drive-service', getTransformAgents: vi.fn(), create: vi.fn() } as unknown as TTransformDriveService;
      const audioService: TAudioService = { name: 'mock-audio-service' } as unknown as TAudioService;
      const mockObj: TPerspectiveCameraWrapper = PerspectiveCameraWrapper(
        { name: 'mock-camera', type: CameraType.Perspective, isActive: false, position: new Vector3(), rotation: new Euler() },
        {
          container,
          transformDriveService,
          audioService
        }
      );
      const registry: TCameraRegistry = CameraRegistry();
      registry.add(mockObj);
      setActiveWrappedEntity(registry, mockObj.id);
      expect(registry.find((w: TAnyCameraWrapper): boolean => w.id === mockObj.id)?.isActive()).toBe(true);
    });

    it('should set "isActive" to "false" for all entities in a registry but the target entity', () => {
      const mockObj1: TSceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: true });
      const mockObj2: TSceneWrapper = SceneWrapper({ name: 'mock-scene-2', isActive: false });
      const mockObjTarget: TSceneWrapper = SceneWrapper({ name: 'mock-scene-target', isActive: false });
      const registry: TSceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObjTarget);
      registry.add(mockObj2);
      setActiveWrappedEntity(registry, mockObjTarget.id);
      expect(registry.find((w: TSceneWrapper): boolean => w.id === mockObj1.id)?.isActive()).toBe(false);
      expect(registry.find((w: TSceneWrapper): boolean => w.id === mockObj2.id)?.isActive()).toBe(false);
      expect(registry.find((w: TSceneWrapper): boolean => w.id === mockObjTarget.id)?.isActive()).toBe(true);
    });

    it('should change "isActive" status of entities', () => {
      const mockObj1: TSceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: true });
      const mockObjTarget: TSceneWrapper = SceneWrapper({ name: 'mock-scene-target', isActive: false });
      const registry: TSceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObjTarget);
      setActiveWrappedEntity(registry, mockObjTarget.id);
      expect(registry.find((w: TSceneWrapper): boolean => w.id === mockObj1.id)?.isActive()).toBe(false);
      expect(registry.find((w: TSceneWrapper): boolean => w.id === mockObjTarget.id)?.isActive()).toBe(true);
    });

    it('should return an active entity', () => {
      const mockObj1: TSceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: false });
      const mockObj2: TSceneWrapper = SceneWrapper({ name: 'mock-scene-2', isActive: false });
      const mockObj3: TSceneWrapper = SceneWrapper({ name: 'mock-scene-3', isActive: false });
      const registry: TSceneRegistry = SceneRegistry();
      registry.add(mockObj1);
      registry.add(mockObj2);
      registry.add(mockObj3);
      const result: TSceneWrapper = setActiveWrappedEntity(registry, mockObj2.id);
      expect(result).toEqual(mockObj2);
    });

    it('should throw an error if no entity with such id', () => {
      const mockObj1: TSceneWrapper = SceneWrapper({ name: 'mock-scene-1', isActive: false });
      const registry: TSceneRegistry = SceneRegistry();
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
        const registry: Map<string, TRegistrable> = new Map();
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
        const registry: Map<string, TRegistrable> = new Map();
        registry.set('obj5None', obj5None);
        expect(shouldHaveTags(obj5None, [tagB], LookUpStrategy.Some)).toEqual(false);
      });

      it('should return "false" if tagList is empty', () => {
        expect(shouldHaveTags(obj4BE, [], LookUpStrategy.Some)).toEqual(false);
      });
    });
  });
});
