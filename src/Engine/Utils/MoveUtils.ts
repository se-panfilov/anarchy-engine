import anime, { EasingOptions } from 'animejs';

import type { IMesh } from '@/Engine';

interface Position {
  x: number;
  y: number;
  z: number;
}

type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'; // Modify this to include the actual easing types

export function goToPosition(actor: IMesh, position: Position, duration: number, easing: EasingOptions = 'linear'): Promise<void> {
  anime({
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

  return Promise.resolve();
}
