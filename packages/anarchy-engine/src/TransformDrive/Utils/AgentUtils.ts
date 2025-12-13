import type { TKinematicData, TKinematicParams } from '@Anarchy/Engine/Kinematic';
import { DEFAULT_RADIUS, ForwardAxis } from '@Anarchy/Engine/Kinematic';
import { KinematicTransformAgent } from '@Anarchy/Engine/TransformDrive/Entities/Agents/KinematicTransformAgent';
import type { TKinematicAgentDependencies, TKinematicTransformAgent, TKinematicTransformAgentParams, TTransformAgentParams } from '@Anarchy/Engine/TransformDrive/Models';
import type { TOptional } from '@Anarchy/Shared/Utils';
import { Quaternion, Vector3 } from 'three';

export function getKinematicTransformAgent(params: TTransformAgentParams, kinematic: TOptional<TKinematicParams> | undefined, dependencies: TKinematicAgentDependencies): TKinematicTransformAgent {
  const agentParams: TTransformAgentParams = { position: params.position, rotation: params.rotation, scale: params.scale ?? new Vector3(1, 1, 1) };
  const kinematicData: TKinematicData = getKinematicWithDefaults(kinematic);
  const kinematicAgentParams: TKinematicTransformAgentParams = { ...agentParams, ...kinematicData, isAutoUpdate: kinematic?.isAutoUpdate ?? true };
  return KinematicTransformAgent(kinematicAgentParams, dependencies);
}

export function getKinematicWithDefaults(kinematic: TOptional<TKinematicParams> | undefined): TKinematicData {
  const state = kinematic?.state ?? {};
  const target = kinematic?.target ?? {};
  const { linearSpeed, linearDirection, angularDirection, angularSpeed, radius } = state;
  const { position, rotation, positionThreshold, rotationThreshold } = target;

  return {
    state: {
      linearSpeed: linearSpeed ?? 0,
      linearDirection: linearDirection ?? new Vector3(),
      angularSpeed: angularSpeed ?? 0,
      angularDirection: angularDirection ?? new Quaternion(),
      radius: radius ?? DEFAULT_RADIUS,
      forwardAxis: ForwardAxis.X,
      isInfiniteRotation: false
    },
    target: {
      positionThreshold: positionThreshold ?? 0.01,
      position,
      rotationThreshold: rotationThreshold ?? 0.0001,
      rotation
    }
  };
}
