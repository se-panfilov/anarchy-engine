import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import type { TRegistrable, TWithName } from '@/Engine/Mixins';

import type { TAbstractAsyncRegistry, TAbstractEntityRegistry, TAbstractResourceAsyncRegistry, TAbstractSimpleRegistry, TRegistryPack } from '../Models';
import { LookUpStrategy } from './Constants';

enum MockTags {
  TagA = 'mock-tag-a',
  TagB = 'mock-tag-b',
  TagC = 'mock-tag-c'
}

//Validates if it's exactly the same object (original), not a copy of the object.
function expectSame<T>(a: T | undefined, b: T | undefined): void {
  expect(Object.is(a, b)).toBe(true);
  expect(a).toBe(b);
  expect(a).toEqual(b as any);
}

// These suits validate that registries are returning original objects, not copies of them.
// So if we modify them later on, the modifications will be applied to the original object in a registry.
function validateCommonRegistryBehavior<T extends TRegistrable>(registry: TAbstractSimpleRegistry<T>, getEntity: () => T, addFn: (registry: any, entity: T) => void): void {
  let entity: T;

  beforeEach(() => {
    entity = getEntity();
    addFn(registry, entity);
  });

  afterEach(() => registry.clear());

  it('should return original via find()', () => {
    const result: T | undefined = registry.find((e: T): boolean => e.name === entity.name);
    expectSame(result, entity);
  });

  it('should return original in asArray()', () => {
    const all: ReadonlyArray<T> = registry.asArray();
    expect(all.some((e: T): boolean => Object.is(e, entity))).toBe(true);
  });

  it('should return original in getRegistryCopy()', () => {
    const copy: Map<string, T> = registry.getRegistryCopy();
    expectSame(copy.get(entity.id), entity);
  });

  it('should return original in forEach()', () => {
    let isFound: boolean = false;
    registry.forEach((e: T): void => {
      if (Object.is(e, entity)) isFound = true;
    });
    expect(isFound).toBe(true);
  });

  validateModificationApplies(registry, getEntity, addFn);
}

export function validateEntityRegistryReturnsOriginalObjects<T extends TRegistrable>(registry: TAbstractEntityRegistry<T>, createEntity: () => T): void {
  describe('Registry Reference Integrity Suite', () => {
    let entity: T;

    beforeEach(() => {
      entity = createEntity();
      registry.add(entity);
    });

    afterEach(() => registry.clear());

    it('should return original via findById', () => {
      expectSame(registry.findById(entity.id), entity);
    });

    it('should return original via findByName', () => {
      expectSame(registry.findByName((entity as TWithName).name), entity);
    });

    it('should return original via findByTag', () => {
      expectSame(registry.findByTag(MockTags.TagA), entity);
      expectSame(registry.findByTag(MockTags.TagB), entity);
      expectSame(registry.findByTag(MockTags.TagC), entity);
    });

    it('should return original via findByTags', () => {
      expectSame(registry.findByTags([MockTags.TagA, MockTags.TagB], LookUpStrategy.Some), entity);
      expectSame(registry.findByTags([MockTags.TagA, MockTags.TagB, MockTags.TagC], LookUpStrategy.Every), entity);
    });

    it('should return original in findAllByTag()', () => {
      const all: ReadonlyArray<T> = registry.findAllByTag(entity.tags?.[0] ?? '');
      expect(all.some((e: T): boolean => Object.is(e, entity))).toBe(true);
    });

    it('should return original in findAllByTags()', () => {
      const all: ReadonlyArray<T> = registry.findAllByTags([MockTags.TagA, MockTags.TagB, MockTags.TagC], LookUpStrategy.Every);
      expect(all.some((e: T): boolean => Object.is(e, entity))).toBe(true);
    });

    validateCommonRegistryBehavior(registry as any, createEntity, (r: TAbstractEntityRegistry<T>, e: T): void => r.add(e));

    it('should emit original in added$', async () => {
      const newEntity: T = createEntity();
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.added$.subscribe((e) => (emitted = e));

      registry.add(newEntity);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, newEntity);
      sub.unsubscribe();
    });

    it('should emit original in replaced$', async () => {
      const updated = { ...entity, name: 'Updated' };
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.replaced$.subscribe((e) => (emitted = e));

      registry.replace(updated);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, updated);
      sub.unsubscribe();
    });

    it('should emit original in removed$', async () => {
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.removed$.subscribe((e) => (emitted = e));

      registry.remove(entity.id);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, entity);
      sub.unsubscribe();
    });
  });
}

export function validateSimpleRegistryReturnsOriginalObjects<T extends TRegistrable>(registry: TAbstractSimpleRegistry<T>, createEntity: () => T): void {
  describe('Registry Reference Integrity Suite', () => {
    let entity: T;

    beforeEach(() => {
      entity = createEntity();
      registry.add(entity.id, entity);
    });

    afterEach(() => registry.clear());

    it('should return original via findByKey', () => {
      expectSame(registry.findByKey(entity.id), entity);
    });

    validateCommonRegistryBehavior(registry as any, createEntity, (r: TAbstractSimpleRegistry<T>, e: T): void => r.add(e.id, e));

    it('should emit original in added$', async () => {
      const newEntity: T = createEntity();
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.added$.subscribe((e) => (emitted = e));

      registry.add(newEntity.id, newEntity);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, newEntity);
      sub.unsubscribe();
    });

    it('should emit original in replaced$', async () => {
      const updated = { ...entity, name: 'Updated' };
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.replaced$.subscribe((e) => (emitted = e));

      registry.replace(entity.id, updated);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, updated);
      sub.unsubscribe();
    });

    it('should emit original in removed$', async () => {
      let emitted: TRegistryPack<T> | null = null;
      const sub: Subscription = registry.removed$.subscribe((e) => (emitted = e));

      registry.remove(entity.id);
      await new Promise((r) => setTimeout(r, 0));

      expect(emitted).not.toBeNull();
      expectSame(emitted!.value, entity);
      sub.unsubscribe();
    });
  });
}

export function validateSimpleAsyncRegistryReturnsOriginalObjects<T extends TRegistrable>(registry: TAbstractResourceAsyncRegistry<T>, createEntity: () => T): void {
  describe('Registry Reference Integrity Suite', () => {
    let entity: T;

    beforeEach(() => {
      entity = createEntity();
      registry.add(entity.id, entity);
    });

    afterEach(() => registry.clear());

    it('should return original via findByKey', () => {
      expectSame(registry.findByKey(entity.id), entity);
    });

    it('should return original via findByKeyAsync', async () => {
      const result: T | undefined = await registry.findByKeyAsync(entity.id);
      expectSame(result, entity);
    });

    it('should return original via findByKey$', async () => {
      const result: T = await firstValueFrom(registry.findByKey$(entity.id));
      expectSame(result, entity);
    });

    validateCommonRegistryBehavior(registry as any, createEntity, (r: TAbstractResourceAsyncRegistry<T>, e: T): void => r.add(e.id, e));
  });
}

export function validateEntityAsyncRegistryReturnsOriginalObjects<T extends TRegistrable>(registry: TAbstractAsyncRegistry<T>, createEntity: () => T): void {
  describe('Registry Reference Integrity Suite', () => {
    let entity: T;

    beforeEach(() => {
      entity = createEntity();
      registry.add(entity);
    });

    afterEach(() => registry.clear());

    it('should return original via findByNameAsync', async () => {
      const result: T | undefined = await registry.findByNameAsync((entity as TWithName).name);
      expectSame(result, entity);
    });

    it('should return original via findByName$', async () => {
      const result: T = await firstValueFrom(registry.findByName$((entity as TWithName).name));
      expectSame(result, entity);
    });

    it('should return original via findByTagAsync', async () => {
      const result: T | undefined = await registry.findByTagAsync(entity.tags?.[0] ?? '');
      expectSame(result, entity);
    });

    it('should return original via findByTag$', async () => {
      const result: T = await firstValueFrom(registry.findByTag$(entity.tags?.[0] ?? ''));
      expectSame(result, entity);
    });

    it('should return original via findByTagsAsync', async () => {
      const result: T | undefined = await registry.findByTagsAsync(entity.tags ?? [], LookUpStrategy.Every);
      expectSame(result, entity);
    });

    it('should return original via findByTags$', async () => {
      const result: T = await firstValueFrom(registry.findByTags$(entity.tags ?? [], LookUpStrategy.Every));
      expectSame(result, entity);
    });

    validateCommonRegistryBehavior(registry as any, createEntity, (r: TAbstractAsyncRegistry<T>, e: T): void => r.add(e));
  });
}

function validateModificationApplies<T extends TRegistrable & { fieldA?: string; fieldB?: string }>(
  registry: TAbstractSimpleRegistry<T>,
  getEntity: () => T,
  addFn: (registry: any, entity: T) => void
): void {
  let entity: T;

  beforeEach(() => {
    entity = getEntity();
    addFn(registry, entity);
  });

  afterEach(() => registry.clear());

  it('should modify the original in registry map', () => {
    // setup
    const fieldAValue: string = 'modified_A_' + nanoid();
    const fieldBValue: string = 'modified_B_' + nanoid();

    const found: T | undefined = registry.find((e: T): boolean => e.id === entity.id);
    expect(found).not.toBeUndefined();
    expectSame(found, entity);

    // execute
    // eslint-disable-next-line functional/immutable-data
    (entity as T).fieldA = fieldAValue;

    // check (1)
    expect(found?.fieldA).not.toBeUndefined();
    expect(found?.fieldA).toBe(fieldAValue);
    expect(found?.fieldA).toBe((entity as T).fieldA);

    // check (2)
    const found2: T | undefined = registry.find((e: T): boolean => e.id === entity.id);
    expect(found2).not.toBeUndefined();
    expectSame(found2, entity);
    expect(found2?.fieldA).not.toBeUndefined();
    expect(found2?.fieldA).toBe(fieldAValue);
    expect(found2?.fieldA).toBe((entity as T).fieldA);

    // execute
    // eslint-disable-next-line functional/immutable-data
    (found as T).fieldB = fieldBValue;

    // check (3)
    expect(found?.fieldB).not.toBeUndefined();
    expect(found?.fieldB).toBe(fieldBValue);
    expect(found?.fieldB).toBe((entity as T).fieldB);
    expect(found2?.fieldB).not.toBeUndefined();
    expect(found2?.fieldB).toBe(fieldBValue);
    expect(found2?.fieldB).toBe((entity as T).fieldB);
  });
}

export function createMockEntity(): TRegistrable {
  return {
    id: nanoid(),
    name: 'mock-name_' + nanoid(),
    tags: [MockTags.TagA, MockTags.TagB, MockTags.TagC]
  };
}
