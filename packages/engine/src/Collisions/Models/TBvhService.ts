import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { MeshBVH } from 'three-mesh-bvh';

import type { TAbstractService } from '@/Abstract';
import type { TActor } from '@/Actor';
import type { TSceneWrapper } from '@/Scene';

import type { TBvhOptions } from './TBvhOptions';

export type TBvhService = TAbstractService &
  Readonly<{
    computeBVHBoundsTree: (geometry: BufferGeometry, options?: TBvhOptions) => MeshBVH;
    disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
    raycastWithBvh: (actor: TActor, raycaster: Raycaster, intersects: Array<Intersection>) => void;
    createBvhForActor: (actor: TActor, options?: TBvhOptions) => void;
    _debugVisualizeBvhForActor: (actor: TActor, sceneW: TSceneWrapper, depth?: number) => void;
    _debugVisualizeBvhForScene: (sceneW: TSceneWrapper, depth?: number) => void;
  }>;
