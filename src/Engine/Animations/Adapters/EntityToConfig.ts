import type { AnimationAction } from 'three';

// TODO 15-0-0: validate
// TODO 15-0-0: implement
// TODO 15-0-0: any
export function animationActionToConfig(entity: AnimationAction): any {
  // export function animationActionToConfig(entity: AnimationAction): TAnimationActionConfigConfig {
  // TODO perhaps we need a relation to the actor here
  return {
    clipName: entity.getClip().name,
    time: entity.time,
    weight: entity.weight,
    loop: entity.loop,
    repetitions: entity.repetitions,
    clampWhenFinished: entity.clampWhenFinished,
    timeScale: entity.timeScale,
    enabled: entity.enabled,
    paused: entity.paused
  };
}
//function deserializeAnimationAction(
//   action: AnimationAction,
//   data: TSerializedAnimationAction
// ): void {
//   action.reset();
//   action.enabled = data.enabled;
//   action.setEffectiveWeight(data.weight);
//   action.setLoop(data.loop, data.repetitions);
//   action.clampWhenFinished = data.clampWhenFinished;
//   action.setEffectiveTimeScale(data.timeScale);
//   action.time = data.time;
//   action.play();
//   action.paused = data.paused;
// }
