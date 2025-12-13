import type { IWithNameAndNameAccessorsMixin } from '@/Engine/Mixins/Generic/Models';

export function withNameAndNameAccessorsMixin(): IWithNameAndNameAccessorsMixin {
  return {
    name: undefined,
    getName: function (): string | undefined {
      return this.name;
    },
    setName: function (name: string): void {
      // eslint-disable-next-line functional/immutable-data
      this.name = name;
    }
  };
}
