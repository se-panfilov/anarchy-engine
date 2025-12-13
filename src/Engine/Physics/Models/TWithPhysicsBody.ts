import type { TPhysicsBody } from './TPhysicsBody';

export type TWithPhysicsBody = Readonly<{
  physicsBody: TPhysicsBody | undefined;
}>;
