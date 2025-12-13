import anime from 'animejs';

interface Position {
  x: number;
  y: number;
  z: number;
}

type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'; // Modify this to include the actual easing types

export function goToPosition(
  actor: any, // Actor,
  position: Position,
  duration: number = 1000,
  easing: EasingType = 'linear'
): Promise<void> {
  const { x, y, z } = actor.getPosition();

  anime({
    targets: { x, y, z },
    x: position.x,
    y: position.y,
    z: position.z,
    easing,
    duration,
    update: () => actor.setPosition({ x, y, z })
  });

  return Promise.resolve();
}
