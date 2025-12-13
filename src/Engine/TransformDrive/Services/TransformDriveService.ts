import type { Subscription } from 'rxjs';
import { Quaternion, Vector3 } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TKinematicLoop } from '@/Engine/Kinematic';
import { toQuaternion } from '@/Engine/Math';
import type { TDisposable } from '@/Engine/Mixins';
import { withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type { TPhysicalLoop } from '@/Engine/Physics';
import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import { ConnectedTransformAgent, DefaultTransformAgent } from '@/Engine/TransformDrive/Entities';
import type {
  TAbstractTransformAgent,
  TGetTransformAgentsOptions,
  TGetTransformAgentsParams,
  TTransformAgentParams,
  TTransformAgents,
  TTransformDrive,
  TTransformDriveCompatibleEntity,
  TTransformDriveFactory,
  TTransformDriveParams,
  TTransformDriveRegistry,
  TTransformDriveService,
  TTransformDriveServiceDependencies,
  TTransformDriveServiceWithFactory,
  TTransformDriveServiceWithRegistry
} from '@/Engine/TransformDrive/Models';
import { getKinematicTransformAgent, getPhysicsTransformAgent } from '@/Engine/TransformDrive/Utils';
import type { TOptional, TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function TransformDriveService(
  factory: TTransformDriveFactory,
  registry: TTransformDriveRegistry,
  { loopService, physicsBodyService }: TTransformDriveServiceDependencies
): TTransformDriveService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((entity: TTransformDrive<TTransformDriveCompatibleEntity>): void => registry.add(entity));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const create = <T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(params: TTransformDriveParams, agents: T): TTransformDrive<T> => {
    return factory.create({ params, agents }, undefined) as TTransformDrive<T>;
  };
  const createFromList = <T extends Partial<Record<TransformAgent, TAbstractTransformAgent>>>(
    paramsList: ReadonlyArray<TTransformDriveParams>,
    agentsList: ReadonlyArray<T>
  ): ReadonlyArray<TTransformDrive<T>> => {
    if (paramsList.length !== agentsList.length) throw new Error('TransformDriveService: paramsList and agentsList should have the same length');
    return paramsList.map((p: TTransformDriveParams, i: number): TTransformDrive<T> => create(p, agentsList[i] as T));
  };

  const withFactory: TTransformDriveServiceWithFactory = withFactoryService(factory);
  const withRegistry: TTransformDriveServiceWithRegistry = withRegistryService(registry);

  function getTransformAgents(
    { position, rotation, scale, kinematic, physics }: TGetTransformAgentsParams,
    { hasKinematic, hasPhysics, hasConnected }: TGetTransformAgentsOptions
  ): TOptional<TTransformAgents> {
    const result: TWriteable<TOptional<TTransformAgents>> = {};

    //PhysicsTransformAgent might need a special "onDeactivated" hook if it supposed to switch physics/non-physics mode in runtime
    const agentParams: TTransformAgentParams = {
      position: position,
      rotation: rotation ? toQuaternion(rotation) : new Quaternion(),
      scale: scale ?? new Vector3(1, 1, 1),
      onDeactivated: undefined,
      onActivated: undefined
    };

    if (hasKinematic) {
      const kinematicLoop: TKinematicLoop = loopService.getKinematicLoop();
      // eslint-disable-next-line functional/immutable-data
      result[TransformAgent.Kinematic] = getKinematicTransformAgent(agentParams, kinematic, { kinematicLoop });
    }

    if (hasPhysics && isDefined(physics)) {
      const physicalLoop: TPhysicalLoop = loopService.getPhysicalLoop();
      // eslint-disable-next-line functional/immutable-data
      result[TransformAgent.Physical] = getPhysicsTransformAgent(agentParams, physics, { physicalLoop, physicsBodyService });
    }

    // eslint-disable-next-line functional/immutable-data
    if (hasConnected) result[TransformAgent.Connected] = ConnectedTransformAgent(agentParams);

    // eslint-disable-next-line functional/immutable-data
    result[TransformAgent.Default] = DefaultTransformAgent(agentParams);

    return result;
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withFactory, withRegistry, { create, createFromList, getTransformAgents });
}
