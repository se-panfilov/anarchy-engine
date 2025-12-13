import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TRaycastBvhOptions } from './TRaycastBvhOptions';

export type TRaycastBvhService = Readonly<{
  computeBVHBoundsTree: (geometry: BufferGeometry, options?: TRaycastBvhOptions) => MeshBVH;
  disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
  raycastWithBvh: (actorW: TActorWrapperAsync, raycaster: Raycaster, intersects: Array<Intersection>) => void;
  createBvhForActor: (actorW: TActorWrapperAsync, options?: TRaycastBvhOptions) => void | never;
  _debugVisualizeRaycastBvh: (actorW: TActorWrapperAsync, sceneW: TSceneWrapper) => void;
}>;
