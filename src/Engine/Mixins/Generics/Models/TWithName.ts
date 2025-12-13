import type { TWriteable } from '@/Engine/Utils';

export type TWithName = Readonly<{ name?: string }>;
export type TWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type TWithNameAndNameAccessorsMixin = TWriteable<TWithName> & TWithNameAccessors;
