import type { IWithTagsMixin } from '@/Engine/Mixins/Generic/Models';
import { withTagsMixin } from '@/Engine/Mixins/Generic/WithTagsMixin';

describe('withTags mixin', () => {
  const tag1: string = 'newTag1';
  const tag2: string = 'newTag2';
  const tag3: string = 'newTag3';

  describe('setTags', () => {
    it('should add new tags', (): void => {
      const instance: IWithTagsMixin = withTagsMixin([]);
      instance.setTags([tag1, tag2]);
      expect(instance.getTags()).toEqual([tag1, tag2]);
    });

    it('should replace old tags with new ones', (): void => {
      const oldTag1: string = 'oldTag1';
      const oldTag2: string = 'newTag2';
      const instance: IWithTagsMixin = withTagsMixin([oldTag1, oldTag2]);
      expect(instance.getTags()).toEqual([oldTag1, oldTag2]);
      instance.setTags([tag1, tag2]);
      expect(instance.getTags()).toEqual([tag1, tag2]);
    });
  });

  describe('addTag', () => {
    it('should add new tag', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      instance.addTag(tag3);
      expect(instance.getTags()).toEqual([tag1, tag2, tag3]);
    });
  });

  describe('removeTag', () => {
    it('should remove tag', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      instance.removeTag(tag2);
      expect(instance.getTags()).toEqual([tag1]);
    });
  });

  describe('hasTag', () => {
    it('should return "true" if a tag is exist', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      expect(instance.hasTag(tag2)).toBe(true);
    });

    it('should return "false" if a tag is NOT exist', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      expect(instance.hasTag(tag3)).toBe(false);
    });
  });

  describe('getTags', () => {
    it('should return all tags', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      expect(instance.getTags()).toEqual([tag1, tag2]);
    });
  });

  describe('clearTags', () => {
    it('should remove all tags', () => {
      const instance: IWithTagsMixin = withTagsMixin([tag1, tag2]);
      instance.clearTags();
      expect(instance.getTags()).toEqual([]);
    });
  });
});
