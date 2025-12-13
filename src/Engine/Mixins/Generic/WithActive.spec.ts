import type { IWithActive } from '@/Engine/Mixins/Generic/Models';

import { adjustWthActive } from './WithActive';

type IMockEntity = {
  name: string;
  isActive: boolean;
  _setActive: (isActive: boolean, isFromService: boolean) => void;
};

describe('adjustWthActive mixin', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let entity: IMockEntity = { name: 'mock-entity123' } as any;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    entity = { name: 'mock-entity123' } as any;
  });

  describe('setTags', () => {
    it('should set "isActive" to "true"', (): void => {
      adjustWthActive(entity, true);
      expect(entity.isActive).toBe(true);
    });

    it('should set "isActive" to "false"', (): void => {
      adjustWthActive(entity, false);
      expect(entity.isActive).toBe(false);
    });

    it('should set "isActive" to "true" via "_setActive"', (): void => {
      adjustWthActive(entity, false);
      expect(entity.isActive).toBe(false);
      entity._setActive(true, true);
      expect(entity.isActive).toBe(true);
    });

    it('should set "isActive" to "false" via "_setActive"', (): void => {
      adjustWthActive(entity, true);
      expect(entity.isActive).toBe(true);
      entity._setActive(false, true);
      expect(entity.isActive).toBe(false);
    });

    it('should set "isActive" to "true" via "_setActive" of returned object', (): void => {
      adjustWthActive(entity, false);
      expect(entity.isActive).toBe(false);
      entity._setActive(true, true);
      expect(entity.isActive).toBe(true);
    });

    it('should set "isActive" to "false" via "_setActive" of returned object', (): void => {
      const adjustedEntity: IWithActive = adjustWthActive(entity, true);
      expect(adjustedEntity.isActive).toBe(true);
      adjustedEntity._setActive(false, true);
      expect(adjustedEntity.isActive).toBe(false);
    });

    it('should throw an error if was called not from the service', (): void => {
      const adjustedEntity: IWithActive = adjustWthActive(entity, false);
      expect(adjustedEntity.isActive).toBe(false);
      expect(() => adjustedEntity._setActive(true, false)).toThrow();
    });

    it('should change value to "true" for constant alias', (): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const entity1: IMockEntity = { name: 'mock-entity123' } as any;
      const entity2: IMockEntity = adjustWthActive(entity1, false);
      expect(entity1.isActive).toBe(false);
      expect(entity2.isActive).toBe(false);
      entity2._setActive(true, true);
      expect(entity1.isActive).toBe(true);
      expect(entity2.isActive).toBe(true);
    });
  });
});
