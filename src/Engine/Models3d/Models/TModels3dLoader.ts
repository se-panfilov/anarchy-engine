import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TModel3dResourceConfig } from './TModel3dResourceConfig';

export type TModels3dLoader = TAbstractLoader<Group | Mesh | Object3D, TModel3dResourceConfig>;
