import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TWithMaybePhysicsBody = Readonly<{
  physicsBody: TPhysicsBodyFacade | undefined;
}>;

export type THasPhysicsBody<T> = Omit<T, 'physicsBody'> & { physicsBody: TPhysicsBodyFacade };
