import type { TPhysicsGlobalProps } from './TPhysicsGlobalProps';
import type { TPhysicsPresetProps } from './TPhysicsPresetProps';

export type TPhysicsProps = Readonly<{
  global: TPhysicsGlobalProps;
  presets: ReadonlyArray<TPhysicsPresetProps>;
}>;
