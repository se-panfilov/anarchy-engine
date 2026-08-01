import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import type { TActor } from '@Anarchy/Engine/Actor';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import type { BufferGeometry, Intersection, Raycaster } from 'three';
import type { GeometryBVH } from 'three-mesh-bvh';

import type { TBvhOptions } from './TBvhOptions';

export type TBvhService = TAbstractService &
  Readonly<{
    computeBVHBoundsTree: (geometry: BufferGeometry, options?: TBvhOptions) => GeometryBVH;
    disposeBVHBoundsTree: (geometry: BufferGeometry) => void;
    raycastWithBvh: (actor: TActor, raycaster: Raycaster, intersects: Array<Intersection>) => void;
    createBvhForActor: (actor: TActor, options?: TBvhOptions) => void;
    _debugVisualizeBvhForActor: (actor: TActor, sceneW: TSceneWrapper, depth?: number) => void;
    _debugVisualizeBvhForScene: (sceneW: TSceneWrapper, depth?: number) => void;
  }>;
