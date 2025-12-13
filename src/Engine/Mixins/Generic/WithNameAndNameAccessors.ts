import type { IWithNameAndNameAccessors } from '@/Engine/Mixins/Generic/Models';

export const withNameAndNameAccessors: IWithNameAndNameAccessors = {
  name: undefined,
  getName: function (): string | undefined {
    return this.name;
  },
  setName: function (name: string): void {
    // eslint-disable-next-line functional/immutable-data
    this.name = name;
  }
};
