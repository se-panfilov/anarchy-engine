import type { IWithActive } from '@/Engine/Mixins/Generic/Models';
import { withActive } from './WithActive';

type IMockEntity = Record<string, string | boolean>;

describe('withActive mixin', () => {
  describe('setTags', () => {
    it('should set "isActive" to "true"', (): void => {
      const entity: IMockEntity = { name: 'mock-entity123' };
      const instance: IWithActive<IMockEntity> = withActive<IMockEntity>(entity, true);
      expect(instance.isActive).toBe(true);
    });

    it('should set "isActive" to "false"', (): void => {
      const entity: IMockEntity = { name: 'mock-entity123' };
      const instance: IWithActive<IMockEntity> = withActive<IMockEntity>(entity, false);
      expect(instance.isActive).toBe(false);
    });
  });
});
