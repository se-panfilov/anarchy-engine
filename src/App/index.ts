import '@App/style.css';

import { showcaseLevel1 as showcase } from '@App/Levels/ShowcaseLevel1';

import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
showcase(canvas);

// START Experiment1: animations ---------------
// level.actor.factory.initial.create({
//   type: ActorType.cube,
//   position: Vector3Wrapper({ x: 0, y: 3, z: 0 }).entity,
//   castShadow: true,
//   materialParams: { color: '#5177ff' },
//   tags: [ActorTag.Intersectable]
// } satisfies IActorParams);
// // END Experiment1: animations ---------------
