import type { TWithName, TWithNameAndNameAccessorsMixin } from '@Anarchy/Engine/Mixins/Generics/Models';
import type { TWriteable } from '@Anarchy/Shared/Utils';

export function withNameAndNameAccessorsMixin<T extends TWriteable<TWithName>>(entity: T): TWithNameAndNameAccessorsMixin {
  return {
    name: entity.name,
    getName: function (): string | undefined {
      return entity.name;
    },
    setName: function (name: string): void {
      // eslint-disable-next-line functional/immutable-data
      entity.name = name;
    }
  };
}
