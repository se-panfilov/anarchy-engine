import type { TSerializableResourceService } from '@Engine/Abstract';
import type { TDelta } from '@Engine/Loop';
import type { TWithLoadResourcesAsyncService, TWithResourcesMetaInfoRegistryService, TWithResourcesRegistryService } from '@Engine/Mixins';
import type { TModel3d, TRawModel3d } from '@Engine/Models3d';
import type { Observable } from 'rxjs';
import type { AnimationClip, AnimationMixer } from 'three';

import type { TAnimationActionsPack } from './TAnimationActionsPack';
import type { TAnimations } from './TAnimations';
import type { TAnimationsResourceAsyncRegistry } from './TAnimationsResourceAsyncRegistry';
import type { TAnimationsResourceConfig } from './TAnimationsResourceConfig';
import type { TModel3dAnimations } from './TModel3dAnimations';

export type TAnimationsService = TSerializableResourceService<TAnimationsResourceConfig> &
  Readonly<{
    createActions: (model: TRawModel3d, animations?: ReadonlyArray<AnimationClip>, mixer?: AnimationMixer) => TAnimationActionsPack;
    added$: Observable<TModel3dAnimations>;
    startAutoUpdateMixer: (model3d: TModel3d, updateTick$?: Observable<TDelta>) => TAnimationActionsPack | never;
    stopAutoUpdateMixer: (mixer: AnimationMixer) => void | never;
  }> &
  TWithResourcesRegistryService<TAnimationsResourceAsyncRegistry> &
  TWithResourcesMetaInfoRegistryService<TAnimationsResourceConfig> &
  TWithLoadResourcesAsyncService<TAnimationsResourceConfig, TAnimations>;
