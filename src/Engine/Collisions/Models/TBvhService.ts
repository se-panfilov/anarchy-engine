import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TActor } from '@/Engine/Actor';
import type { TSceneWrapper } from '@/Engine/Scene';

import type { TBvhOptions } from './TBvhOptions';

export type TBvhService = Readonly<{
  computeBVHBoundsTree: (geometry: BufferGeometry, options?: TBvhOptions) => MeshBVH;
  disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
  raycastWithBvh: (actorW: TActor, raycaster: Raycaster, intersects: Array<Intersection>) => void;
  createBvhForActor: (actorW: TActor, options?: TBvhOptions) => void;
  _debugVisualizeBvhForActor: (actorW: TActor, sceneW: TSceneWrapper, depth?: number) => void;
  _debugVisualizeBvhForScene: (sceneW: TSceneWrapper, depth?: number) => void;
}>;
