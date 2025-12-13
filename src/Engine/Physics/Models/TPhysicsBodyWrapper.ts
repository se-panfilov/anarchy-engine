import type { RigidBody } from '@dimforge/rapier3d';

import type { TWrapper } from '@/Engine/Abstract';
import type { TMovable3dXYZ, TRotatable, TScalable, TWithTagsMixin } from '@/Engine/Mixins';

export type TPhysicsBodyWrapper = TWrapper<RigidBody> & TMovable3dXYZ & TRotatable & TScalable & TWithTagsMixin;
