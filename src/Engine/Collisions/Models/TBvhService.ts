import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TBvhOptions } from './TBvhOptions';

export type TBvhService = Readonly<{
  computeBVHBoundsTree: (geometry: BufferGeometry, options?: TBvhOptions) => MeshBVH;
  disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
  raycastWithBvh: (actorW: TActorWrapperAsync, raycaster: Raycaster, intersects: Array<Intersection>) => void;
  createBvhForActor: (actorW: TActorWrapperAsync, options?: TBvhOptions) => void;
  _debugVisualizeBvhForActor: (actorW: TActorWrapperAsync, sceneW: TSceneWrapper, depth?: number) => void;
  _debugVisualizeBvhForScene: (sceneW: TSceneWrapper, depth?: number) => void;
}>;
