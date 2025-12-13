import type { TWriteable } from '@/Engine/Utils';

export type TWithNameOptional = Readonly<{ name?: string }>;
export type TWithName = Required<TWithNameOptional>;
export type TWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type TWithNameAndNameAccessorsMixin = TWriteable<TWithNameOptional> & TWithNameAccessors;
