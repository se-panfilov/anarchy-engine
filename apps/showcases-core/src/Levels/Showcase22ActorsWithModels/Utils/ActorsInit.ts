import type { TActor, TFsmStates, TFsmWrapper, TModel3d, TSpaceServices } from '@hellpig/anarchy-engine';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';
import { distinctUntilChanged } from 'rxjs';
import type { AnimationAction } from 'three';

export function initSolder1(actorName: string, fadeDuration: number, { animationsService, fsmService, actorService }: TSpaceServices): TFsmWrapper {
  const actor: TActor = actorService.getRegistry().getByName(actorName);
  const model3d: TModel3d = actor.model3d;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  enum AnimationActions {
    Run = 'Run',
    Walk = 'Walk',
    Idle = 'Idle'
    // TPose = 'TPose'
  }

  const { Run, Walk, Idle } = AnimationActions;

  const runAction: AnimationAction = actions[Run];
  const walkAction: AnimationAction = actions[Walk];
  const idleAction: AnimationAction = actions[Idle];
  // const tPoseAction: AnimationAction = actions['TPose'];

  const solderAnimFsm: TFsmWrapper = fsmService.create({
    name: 'solder_anim_fsm',
    type: 'animation',
    initial: Idle,
    transitions: [
      [Idle, Run, Run],
      [Idle, Walk, Walk],
      [Walk, Idle, Idle],
      [Walk, Run, Run],
      [Run, Walk, Walk],
      [Run, Idle, Idle]
    ]
  });

  actor.setAnimationsFsm(solderAnimFsm);

  const { animationsFsm } = actor.states;
  if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

  animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    switch (state) {
      case Idle:
        walkAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        idleAction.reset().fadeIn(fadeDuration).play();
        break;
      case Walk:
        idleAction.fadeOut(fadeDuration);
        runAction.fadeOut(fadeDuration);
        walkAction.reset().fadeIn(fadeDuration).play();
        break;
      case Run:
        idleAction.fadeOut(fadeDuration);
        walkAction.fadeOut(fadeDuration);
        runAction.reset().fadeIn(fadeDuration).play();
        break;
      default:
        throw new Error(`Unknown state: ${String(state)}`);
    }
  });

  return animationsFsm;
}

export function initSolder2(actorName: string, fadeDuration: number, { animationsService, actorService }: TSpaceServices): TFsmWrapper {
  const actor: TActor = actorService.getRegistry().getByName(actorName);
  const model3d: TModel3d = actor.model3d;
  const actions = animationsService.startAutoUpdateMixer(model3d).actions;

  const idleAction: AnimationAction = actions['Idle'];
  const danceAction: AnimationAction = actions['Armature|mixamo.com|Layer0'];

  const { animationsFsm } = actor.states;
  if (isNotDefined(animationsFsm)) throw new Error('Animations FSM is not defined');

  animationsFsm.changed$.pipe(distinctUntilChanged()).subscribe((state: TFsmStates): void => {
    switch (state) {
      case 'Idle':
        danceAction.fadeOut(fadeDuration);
        idleAction.reset().fadeIn(fadeDuration).play();
        break;
      case 'Dance':
        idleAction.fadeOut(fadeDuration);
        danceAction.reset().fadeIn(fadeDuration).play();
        break;
      default:
        throw new Error(`Unknown state: ${String(state)}`);
    }
  });

  return animationsFsm;
}
