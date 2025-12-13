import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TWithPhysicsBodyFacade = Readonly<{
  physicsBody: TPhysicsBodyFacade | undefined;
}>;
