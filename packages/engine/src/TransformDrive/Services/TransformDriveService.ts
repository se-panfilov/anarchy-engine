import type { Subscription } from 'rxjs';
import { Quaternion, Vector3 } from 'three';

import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TKinematicLoop } from '@/Kinematic';
import { toQuaternion } from '@/Math';
import type { TDisposable } from '@/Mixins';
import { withFactoryService, withRegistryService, withSerializableEntities } from '@/Mixins';
import type { TPhysicsLoop } from '@/Physics';
import { TransformAgent } from '@/TransformDrive/Constants';
import { ConnectedTransformAgent, DefaultTransformAgent, PhysicsTransformAgent } from '@/TransformDrive/Entities';
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
  TTransformDriveSerializedData,
  TTransformDriveService,
  TTransformDriveServiceDependencies,
  TTransformDriveServiceWithFactory,
  TTransformDriveServiceWithRegistry
} from '@/TransformDrive/Models';
import { getKinematicTransformAgent } from '@/TransformDrive/Utils';
import type { TOptional, TWriteable } from '@/Utils';
import { isDefined, mergeAll } from '@/Utils';

export function TransformDriveService(factory: TTransformDriveFactory, registry: TTransformDriveRegistry, { loopService }: TTransformDriveServiceDependencies): TTransformDriveService {
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
    { position, rotation, scale, kinematic, physicsBody }: TGetTransformAgentsParams,
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

    if (hasPhysics && isDefined(physicsBody)) {
      const physicsLoop: TPhysicsLoop = loopService.getPhysicsLoop();
      // eslint-disable-next-line functional/immutable-data
      result[TransformAgent.Physics] = PhysicsTransformAgent({ ...agentParams, physicsBody: physicsBody }, { physicsLoop });
    }

    // eslint-disable-next-line functional/immutable-data
    if (hasConnected) result[TransformAgent.Connected] = ConnectedTransformAgent(agentParams);

    // eslint-disable-next-line functional/immutable-data
    result[TransformAgent.Default] = DefaultTransformAgent(agentParams);

    return result;
  }

  return mergeAll(abstractService, withFactory, withRegistry, withSerializableEntities<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveSerializedData, undefined>(registry), {
    create,
    createFromList,
    getTransformAgents
  });
}
