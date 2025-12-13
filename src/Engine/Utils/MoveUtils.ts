import anime, { EasingOptions } from 'animejs';

import type { IMesh } from '@/Engine';

interface Position {
  x: number;
  y: number;
  z: number;
}

// TODO (S.Panfilov) CWP what about delta time?
// Now the value change depends on a frame rate
// add loop.tick$.subscribe((delta) => { ... })
// and do animation.tick(delta)

export function goToPosition(actor: IMesh, position: Position, duration: number, easing: EasingOptions = 'linear'): Promise<void> {
  const timeline = anime.timeline({
    autoplay: false
  });

  timeline.add({
    targets: actor.position,
    x: position.x,
    y: position.y,
    z: position.z,
    round: 0, //i.g. animation steps (how often to update the value)
    delay: 0,
    endDelay: 0, //i.g. delay after animation
    direction: 'alternate', //i.g. alternate, reverse, normal
    // loop: true,
    duration,
    easing,
    update: function () {
      // console.log(actor.position);
    }
  });

  return timeline.finished;
}
