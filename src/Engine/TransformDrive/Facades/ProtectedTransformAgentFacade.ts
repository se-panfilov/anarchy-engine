import type { TAbstractTransformAgent, TProtectedTransformAgentFacade } from '@/Engine/TransformDrive/Models';

export function ProtectedTransformAgentFacade<T extends TAbstractTransformAgent>(agent: T): TProtectedTransformAgentFacade<T> {
  return {
    ...agent,
    position$: agent.position$.asObservable(),
    rotation$: agent.rotation$.asObservable(),
    scale$: agent.scale$.asObservable()
  };
}
