import type { TPhysicsBody } from './TPhysicsBody';

export type TWithOptionalPhysicsBody = Readonly<{
  physicsBody?: TPhysicsBody | undefined;
}>;

export type TWithMandatoryPhysicsBody<T> = Omit<T, 'physicsBody'> & { physicsBody: TPhysicsBody };
