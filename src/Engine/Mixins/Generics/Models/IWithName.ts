import type { TWriteable } from '@/Engine/Utils';

export type IWithName = Readonly<{ name?: string }>;
export type IWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type IWithNameAndNameAccessorsMixin = TWriteable<IWithName> & IWithNameAccessors;
