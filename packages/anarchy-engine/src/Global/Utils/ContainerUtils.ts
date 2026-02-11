import { ContainerDecorator } from '@Anarchy/Engine/Global/Decorators';
import type { TContainerDecorator } from '@Anarchy/Engine/Global/Models';
import { isNotDefined } from '@hellpig/anarchy-shared/Utils';

export function getCanvasContainer(canvas: HTMLCanvasElement): TContainerDecorator | never {
  const parent: HTMLElement | null = canvas.parentElement;
  if (isNotDefined(parent)) throw new Error(`Can't find canvas' parent element`);
  return ContainerDecorator(parent);
}
