import type { Subscription } from 'rxjs';
import type { Euler } from 'three';
import type { Vector3 } from 'three/src/math/Vector3';

import { TransformAgent } from '@/Engine/TransformDrive/Constants';
import type { TAbstractTransformAgent, TDefaultTransformAgent, TTransformAgentParams } from '@/Engine/TransformDrive/Models';

import { AbstractTransformAgent } from './AbstractTransformAgent';

export function DefaultTransformAgent(params: TTransformAgentParams): TDefaultTransformAgent {
  const abstractTransformAgent: TAbstractTransformAgent = AbstractTransformAgent(params, TransformAgent.Default);

  const destroySub$: Subscription = abstractTransformAgent.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

    abstractTransformAgent.destroy$.next();
  });

  return {
    ...abstractTransformAgent,
    setPosition: (position: Vector3): void => abstractTransformAgent.position$.next(position),
    setRotation: (rotation: Euler): void => abstractTransformAgent.rotation$.next(rotation),
    setScale: (scale: Vector3): void => abstractTransformAgent.scale$.next(scale)
  };
}
