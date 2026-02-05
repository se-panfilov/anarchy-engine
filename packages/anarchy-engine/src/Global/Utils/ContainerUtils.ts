import { ContainerDecorator } from '@hellpig/anarchy-engine/Global/Decorators';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global/Models';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';

export function getCanvasContainer(canvas: HTMLCanvasElement): TContainerDecorator | never {
  const parent: HTMLElement | null = canvas.parentElement;
  if (isNotDefined(parent)) throw new Error(`Can't find canvas' parent element`);
  return ContainerDecorator(parent);
}
