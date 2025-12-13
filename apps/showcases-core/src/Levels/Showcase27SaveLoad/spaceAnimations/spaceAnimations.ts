import type { TActor, TSpace, TSpaceConfig } from '@Anarchy/Engine';
import { BehaviorSubject } from 'rxjs';
import type { AnimationAction, AnimationClip, AnimationMixer } from 'three';
import { LoopOnce } from 'three';

import type { TSpacesData } from '../ShowcaseTypes';
import { addAwait, getContainer, removeAwait } from '../utils';
import spaceConfig from './spaceAnimations.json';

const config: TSpaceConfig = spaceConfig as TSpaceConfig;

enum AnimationActions {
  Idle = 'Idle',
  Run = 'Run'
}

const fadeDuration = 0.3;

const { Idle, Run } = AnimationActions;

// We don't want to reset/pause animations when the changed scene is loaded
let isOriginalSceneLoaded: boolean = true;

export const spaceAnimationsData: TSpacesData = {
  name: config.name,
  config: config,
  container: getContainer(config.canvasSelector),
  awaits$: new BehaviorSubject<ReadonlySet<string>>(new Set()),
  onSpaceReady(space: TSpace): void {
    addAwait('onSpaceReady', spaceAnimationsData.awaits$);
    initRunningSolder('solder_actor_1', space);
    initDancingSolder('solder_actor_2', space);
    setTimeout((): void => {
      removeAwait('onSpaceReady', spaceAnimationsData.awaits$);
    }, fadeDuration);
  },
  onChange: (space: TSpace): void => {
    addAwait('onChange', spaceAnimationsData.awaits$);
    changeRunningSolder('solder_actor_1', space);
    changeDancingSolder('solder_actor_2', space);
    isOriginalSceneLoaded = false;
    removeAwait('onChange', spaceAnimationsData.awaits$);
  }
};

function initRunningSolder(actorName: string, space: TSpace): void {
  const solder: TActor = space.services.actorService.getRegistry().getByName(actorName);
  const actions = space.services.animationsService.startAutoUpdateMixer(solder.model3d).actions;

  const idleAction: AnimationAction = actions[Idle];
  const runAction: AnimationAction = actions[Run];

  if (isOriginalSceneLoaded) {
    runAction.fadeOut(fadeDuration);
    idleAction.reset().fadeIn(fadeDuration).play();
    // eslint-disable-next-line functional/immutable-data
    idleAction.paused = true;
  }
}

function changeRunningSolder(actorName: string, space: TSpace): void {
  const solder: TActor = space.services.actorService.getRegistry().getByName(actorName);
  const idleAction: AnimationAction = solder.model3d.actions[Idle];
  const runAction: AnimationAction = solder.model3d.actions[Run];

  idleAction.fadeOut(fadeDuration);
  playAnimationUntilFrame(solder.model3d.getMixer(), runAction, 15, 30);
}

function initDancingSolder(actorName: string, space: TSpace): void {
  const solder: TActor = space.services.actorService.getRegistry().getByName(actorName);
  const actions = space.services.animationsService.startAutoUpdateMixer(solder.model3d).actions;

  const idleAction: AnimationAction = actions[Idle];
  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];

  if (isOriginalSceneLoaded) {
    danceAction.fadeOut(fadeDuration);
    idleAction.reset().fadeIn(fadeDuration).play();
    // eslint-disable-next-line functional/immutable-data
    idleAction.paused = true;
  }
}

function changeDancingSolder(actorName: string, space: TSpace): void {
  const solder: TActor = space.services.actorService.getRegistry().getByName(actorName);
  const idleAction: AnimationAction = solder.model3d.actions[Idle];
  const danceAction: AnimationAction = solder.model3d.actions['Armature|mixamo.com|Layer0'];

  idleAction.fadeOut(fadeDuration);
  playAnimationUntilFrame(solder.model3d.getMixer(), danceAction, 15, 30);
  solder.drive.default.setY(solder.drive.position$.value.y + 1.9);
}

export function playAnimationUntilFrame(mixer: AnimationMixer, action: AnimationAction, targetFrame: number, animationFps: number = 30, step: number = 1 / 60, maxSteps: number = 10000): void {
  const clip: AnimationClip = action.getClip();
  const duration: number = clip.duration;
  const targetTime: number = targetFrame / animationFps;

  if (targetTime > duration) {
    console.warn(`[APP] Target frame ${targetFrame} exceeds clip duration (${duration}s). Will clamp.`);
  }

  action.reset();
  action.setLoop(LoopOnce, 0);
  // eslint-disable-next-line functional/immutable-data
  action.clampWhenFinished = true;
  // eslint-disable-next-line functional/immutable-data
  action.enabled = true;
  action.play();

  mixer.update(0);

  let steps: number = 0;
  // eslint-disable-next-line functional/no-loop-statements
  while (action.time < targetTime && steps < maxSteps) {
    mixer.update(step);
    steps++;
  }

  // eslint-disable-next-line functional/immutable-data
  action.time = Math.min(targetTime, duration);
  mixer.update(0);
  // eslint-disable-next-line functional/immutable-data
  action.paused = true;

  if (steps >= maxSteps) {
    console.warn('[APP] playAnimationUntilFrame: Reached max steps, animation may not be complete.');
  }
}
