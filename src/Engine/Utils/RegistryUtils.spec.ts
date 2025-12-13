import { getAllEntitiesWithEveryTag, getAllEntitiesWithSomeTag } from './RegistryUtils';

interface MyObj {
  readonly name: string;
  readonly tags: ReadonlyArray<string>;
}

describe('RegistryUtils', () => {
  const tag1: string = 'tag1';
  const tag2: string = 'tag2';
  const tag3: string = 'tag3';
  const tag4: string = 'tag4';
  const tag5: string = 'tag5';

  const obj1: MyObj = { name: '1', tags: [tag1, tag2] };
  const obj2: MyObj = { name: '2', tags: [tag2] };
  const obj3: MyObj = { name: '3', tags: [tag3, tag4] };
  const obj4: MyObj = { name: '4', tags: [tag2, tag5] };
  const obj5: MyObj = { name: '5', tags: [] };
  const obj6: MyObj = { name: '6', tags: [tag1, tag2, tag5] };
  const obj7: MyObj = { name: '7', tags: [tag5, tag2] };

  const registry: Map<string, MyObj> = new Map();
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
