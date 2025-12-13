import type { TOptional, TWriteable } from '@Shared/Utils';

export type TWithNameOptional = TOptional<TWithName>;
export type TWithName = Readonly<{ name: string }>;
export type TWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type TWithNameAndNameAccessorsMixin = TWriteable<TWithName> & TWithNameAccessors;
