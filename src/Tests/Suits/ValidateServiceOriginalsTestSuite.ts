import { afterEach, expect, it, vi } from 'vitest';

import type { TRegistrable } from '@/Engine/Mixins';
import type { TWithCreateService, TWithFactoryService, TWithRegistryService } from '@/Engine/Space/Models';
import type { TWriteable } from '@/Engine/Utils';

//Validates if it's exactly the same object (original), not a copy of the object.
function expectSame<T>(a: T | undefined, b: T | undefined): void {
  expect(Object.is(a, b)).toBe(true);
  expect(a).toBe(b);
  expect(a).toEqual(b);
}

type TAnyMockService<T, P> = TWithCreateService<T, P> & TWithFactoryService<any> & TWithRegistryService<any>;

vi.mock('three/examples/jsm/loaders/DRACOLoader.js', () => {
  return {
    DRACOLoader: class {
      setDecoderPath = vi.fn();
      load = vi.fn((_url: string, onLoad: any) => {
        onLoad({ mock: 'geometry' });
      });
      dispose = vi.fn();
      setDecoderConfig = vi.fn();
      preload = vi.fn();
    }
  };
});

export function validateCommonServiceBehavior<T extends TRegistrable, P>(getData: () => Promise<{ service: TAnyMockService<T, P>; params: P }>): void {
  afterEach(() => {
    // const { service, params } = await getData();
    // return getService().getRegistry().clear();
  });

  it('should return the same object from registry', async () => {
    const { service, params } = await getData();
    const returnedEntity: T = service.create(params);
    const foundEntity: T | undefined = service.getRegistry().find((e: T): boolean => e.id === returnedEntity.id);
    expectSame(returnedEntity, foundEntity);
  });

  it('should modify obj from a registry when modify the returned one', async () => {
    // setup
    const { service, params } = await getData();

    const newName: string = 'newName';
    const returnedEntity: T = service.create(params);
    const foundEntity: T | undefined = service.getRegistry().find((e: T): boolean => e.id === returnedEntity.id);

    // execute
    // eslint-disable-next-line functional/immutable-data
    (returnedEntity as TWriteable<T>).name = newName;
    // eslint-disable-next-line functional/immutable-data
    (returnedEntity as any).someNewPropWhatever = newName;

    // check
    expect(foundEntity?.name).toBe(newName);
    expect((foundEntity as any)?.someNewPropWhatever).toBe(newName);
  });

  it('should modify obj the returned obj when modify the one from a registry', async () => {
    // setup
    const { service, params } = await getData();

    const newName: string = 'newName';
    const returnedEntity: T = service.create(params);
    const foundEntity: T | undefined = service.getRegistry().find((e: T): boolean => e.id === returnedEntity.id);

    // execute
    // eslint-disable-next-line functional/immutable-data
    (foundEntity as TWriteable<T>).name = newName;
    // eslint-disable-next-line functional/immutable-data
    (foundEntity as any).someNewPropWhatever = newName;

    // check
    expect(returnedEntity?.name).toBe(newName);
    expect((returnedEntity as any)?.someNewPropWhatever).toBe(newName);
  });
}
