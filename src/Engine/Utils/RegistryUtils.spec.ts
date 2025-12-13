import type { IRegistrable } from '@/Engine/Mixins';
import { withTags } from '@/Engine/Mixins/Generic/WithTags';

import { getAllEntitiesWithEveryTag, getAllEntitiesWithSomeTag } from './RegistryUtils';

describe('RegistryUtils', () => {
  const tag1: string = 'tag1';
  const tag2: string = 'tag2';
  const tag3: string = 'tag3';
  const tag4: string = 'tag4';
  const tag5: string = 'tag5';

  const obj1: IRegistrable = { id: '1', ...withTags([tag1, tag2]) };
  const obj2: IRegistrable = { id: '2', ...withTags([tag2]) };
  const obj3: IRegistrable = { id: '3', ...withTags([tag3, tag4]) };
  const obj4: IRegistrable = { id: '4', ...withTags([tag2, tag5]) };
  const obj5: IRegistrable = { id: '5', ...withTags([]) };
  const obj6: IRegistrable = { id: '6', ...withTags([tag1, tag2, tag5]) };
  const obj7: IRegistrable = { id: '7', ...withTags([tag5, tag2]) };

  const registry: Map<string, IRegistrable> = new Map();
  registry.set('obj1', obj1);
  registry.set('obj2', obj2);
  registry.set('obj3', obj3);
  registry.set('obj4', obj4);
  registry.set('obj5', obj5);
  registry.set('obj6', obj6);
  registry.set('obj7', obj7);

  describe('getAllEntitiesWithEveryTag', () => {
    it('should return all object that contains multiple tags', () => {
      expect(getAllEntitiesWithEveryTag([tag2, tag5], registry)).toEqual([obj4, obj6, obj7]);
    });

    it('should return all object that contains a single tag', () => {
      expect(getAllEntitiesWithEveryTag([tag2], registry)).toEqual([obj1, obj2, obj4, obj6, obj7]);
    });

    it('should return an empty array if no tagList is provided', () => {
      expect(getAllEntitiesWithEveryTag([], registry)).toEqual([]);
    });

    it('should return an empty array if the registry is empty', () => {
      expect(getAllEntitiesWithEveryTag([tag2, tag5], new Map())).toEqual([]);
    });
  });

  describe('getAllEntitiesWithSomeTag', () => {
    it('should return all object that contains multiple tags', () => {
      expect(getAllEntitiesWithSomeTag([tag2, tag5], registry)).toEqual([obj1, obj2, obj4, obj6, obj7]);
    });

    it('should return all object that contains a single tag', () => {
      expect(getAllEntitiesWithSomeTag([tag2], registry)).toEqual([obj1, obj2, obj4, obj6, obj7]);
    });

    it('should return an empty array if no tagList is provided', () => {
      expect(getAllEntitiesWithSomeTag([], registry)).toEqual([]);
    });

    it('should return an empty array if the registry is empty', () => {
      expect(getAllEntitiesWithSomeTag([tag2, tag5], new Map())).toEqual([]);
    });
  });
});
