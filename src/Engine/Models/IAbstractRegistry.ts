import type { IWrapper } from '@Engine/Models';

export interface IAbstractRegistry<T extends IWrapper<unknown>> {
  readonly id: string;
  readonly add: (entity: T) => void;
  readonly replace: (entity: T) => void;
  readonly registry: Map<string, T>;
  readonly getById: (id: string) => T | undefined;
  readonly remove: (id: string) => void;
  readonly destroy: () => void;
}
