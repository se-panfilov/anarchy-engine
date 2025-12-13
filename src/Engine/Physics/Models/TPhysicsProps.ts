import type { TPhysicsBodyProps } from './TPhysicsBodyProps';
import type { TPhysicsGlobalProps } from './TPhysicsGlobalProps';

export type TPhysicsProps = Readonly<{
  global: TPhysicsGlobalProps;
  presets: ReadonlyArray<TPhysicsBodyProps>;
}>;
