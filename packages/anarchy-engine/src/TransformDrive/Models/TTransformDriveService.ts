import type { TSerializableEntitiesService } from '@Anarchy/Engine/Abstract';
import type { TWithFactoryService, TWithRegistryService } from '@Anarchy/Engine/Mixins';
import type { TransformAgent } from '@Anarchy/Engine/TransformDrive/Constants';
import type { TOptional } from '@Anarchy/Shared/Utils';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TGetTransformAgentsOptions, TGetTransformAgentsParams } from './TGetTransformAgentsParams';
import type { TTransformAgents } from './TTransformAgents';
import type { TTransformDrive, TTransformDriveCompatibleEntity } from './TTransformDrive';
import type { TTransformDriveFactory } from './TTransformDriveFactory';
import type { TTransformDriveFactoryParams } from './TTransformDriveFactoryParams';
import type { TTransformDriveParams } from './TTransformDriveParams';
import type { TTransformDriveRegistry } from './TTransformDriveRegistry';
import type { TTransformDriveSerializedData } from './TTransformDriveSerializedData';

export type TCreateFromServiceTransformDriveFn<T, P1, P2> = (params: P1, agents: P2) => T;

export type TWithCreateTransformDriveService<T, P1, P2> = Readonly<{
  create: TCreateFromServiceTransformDriveFn<T, P1, P2>;
  createFromList: (paramsList: ReadonlyArray<P1>, agentsList: ReadonlyArray<P2>) => ReadonlyArray<T>;
}>;

export type TTransformDriveServiceWithCreate = TWithCreateTransformDriveService<
  TTransformDrive<TTransformDriveCompatibleEntity>,
  TTransformDriveParams,
  Partial<Record<TransformAgent, TAbstractTransformAgent>>
>;
export type TTransformDriveServiceWithFactory = TWithFactoryService<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveFactoryParams, undefined, TTransformDriveFactory>;
export type TTransformDriveServiceWithRegistry = TWithRegistryService<TTransformDriveRegistry>;

export type TTransformDriveService = TSerializableEntitiesService<TTransformDrive<TTransformDriveCompatibleEntity>, TTransformDriveSerializedData> &
  TTransformDriveServiceWithCreate &
  TTransformDriveServiceWithFactory &
  TTransformDriveServiceWithRegistry &
  Readonly<{
    getTransformAgents: (params: TGetTransformAgentsParams, options: TGetTransformAgentsOptions) => TOptional<TTransformAgents>;
  }>;
