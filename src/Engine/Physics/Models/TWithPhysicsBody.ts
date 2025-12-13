import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TWithPhysicsBody = Readonly<{
  physicsBody: TPhysicsBodyFacade | undefined;
}>;
