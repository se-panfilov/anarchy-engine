import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TKinematicLoop } from '@Anarchy/Engine/Kinematic';
import { toQuaternion } from '@Anarchy/Engine/Math';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withFactoryService, withRegistryService, withSerializableEntities } from '@Anarchy/Engine/Mixins';
import type { TPhysicsLoop } from '@Anarchy/Engine/Physics';
import { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import { ConnectedTransformAgent, DefaultTransformAgent, PhysicsTransformAgent } from '@Anarchy/Engine/TransformDrive/Entities';
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
} from '@Anarchy/Engine/TransformDrive/Models';
import { getKinematicTransformAgent } from '@Anarchy/Engine/TransformDrive/Utils';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { TOptional, TWriteable } from '@Anarchy/Shared/Utils';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { Quaternion, Vector3 } from 'three';

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
