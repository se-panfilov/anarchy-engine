import type { TWithNameAndNameAccessorsMixin } from '@/Engine/Mixins/Generics/Models';

export function withNameAndNameAccessorsMixin(): TWithNameAndNameAccessorsMixin {
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
