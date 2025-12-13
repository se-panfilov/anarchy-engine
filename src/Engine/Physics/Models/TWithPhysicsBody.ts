import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TWithOptionalPhysicsBody = Readonly<{
  physicsBody?: TPhysicsBodyFacade | undefined;
}>;

export type TWithMandatoryPhysicsBody<T> = Omit<T, 'physicsBody'> & { physicsBody: TPhysicsBodyFacade };
