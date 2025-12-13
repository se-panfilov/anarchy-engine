import { withActiveMixin } from './WithActiveMixin';

type TMockEntity = {
  name: string;
  isActive: () => boolean;
  _setActive: (isActive: boolean, isFromService: boolean) => void;
};

describe('adjustWthActive', () => {
  it('should set "isActive" to "true" when mixin added during entity creation', (): void => {
    const entity = { name: 'mock-entity', ...withActiveMixin() };
    expect(entity.isActive()).toBe(false);
    entity._setActive(true, true);
    expect(entity._isActive).toBe(true);
    expect(entity.isActive()).toBe(true);
  });

  it('should set "isActive" to "true" and then to "false" when mixin added during entity creation', (): void => {
    const entity = { name: 'mock-entity', ...withActiveMixin() };
    expect(entity.isActive()).toBe(false);
    entity._setActive(true, true);
    expect(entity.isActive()).toBe(true);
    entity._setActive(false, true);
    expect(entity.isActive()).toBe(false);
  });

  it('should throw an error if was called not from the service', (): void => {
    const mixin = { ...withActiveMixin() };
    expect(() => mixin._setActive(true, false)).toThrow();
  });

  it('should set "isActive" to "true" when add mixin after entity creation', (): void => {
    let entity = { name: 'mock-entity' } as TMockEntity;
    entity = { ...entity, ...withActiveMixin() };
    expect(entity.isActive()).toBe(false);
    entity._setActive(true, true);
    expect(entity.isActive()).toBe(true);
  });

  it('should set "isActive" to "false" when add mixin after entity creation', (): void => {
    let entity = { name: 'mock-entity' } as TMockEntity;
    entity = { ...entity, ...withActiveMixin() };
    expect(entity.isActive()).toBe(false);
    entity._setActive(true, true);
    expect(entity.isActive()).toBe(true);
    entity._setActive(false, true);
    expect(entity.isActive()).toBe(false);
  });

  it('should NOT change the value to "true" for constant alias', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entity1: TMockEntity = { name: 'mock-entity' } as any;
    const entity2: TMockEntity = { ...entity1, ...withActiveMixin() };
    expect(entity1.isActive).toBeUndefined();
    expect(entity2.isActive()).toBe(false);
    entity2._setActive(true, true);
    expect(entity1.isActive).toBeUndefined();
    expect(entity2.isActive()).toBe(true);
  });
});
