import type { TWriteable } from '@/Engine/Utils';

export type TWithName = Readonly<{ name?: string }>;
export type IWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type IWithNameAndNameAccessorsMixin = TWriteable<TWithName> & IWithNameAccessors;
