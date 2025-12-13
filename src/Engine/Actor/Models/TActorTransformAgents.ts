import type { TTransformAgents, TWithProtectedTransformAgents } from '@/Engine/TransformDrive';

export type TActorTransformAgents = TTransformAgents;

export type TActorProtectedTransformAgents = TWithProtectedTransformAgents<TActorTransformAgents>;
