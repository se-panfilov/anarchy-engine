import type { TPhysicsBodyWrapper } from './TPhysicsBodyWrapper';

export type TWithPhysicsBody = Readonly<{
  physicsBody: TPhysicsBodyWrapper | undefined;
}>;
