import type { IWriteable } from '@/Engine/Utils';

export type IWithName = Readonly<{ name?: string }>;
export type IWithNameAccessors = Readonly<{
  getName: () => string | undefined;
  setName: (name: string) => void;
}>;

export type IWithNameAndNameAccessors = IWriteable<IWithName> & IWithNameAccessors;
