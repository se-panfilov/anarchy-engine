import type { Vector3Like } from 'three';

import type { TPhysicsIntegrationParameters } from './TPhysicsIntegrationParameters';

export type TPhysicsWorldParams = Readonly<{
  gravity?: Vector3Like;
  integrationParameters?: TPhysicsIntegrationParameters;
}>;
