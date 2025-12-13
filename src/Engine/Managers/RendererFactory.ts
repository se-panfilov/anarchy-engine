import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import type { Factory } from '@Engine/Models/Factory';

const create = (canvas: HTMLElement): ReturnType<typeof RendererWrapper> => RendererWrapper(canvas);

export const RendererFactory = (): Factory<ReturnType<typeof RendererWrapper>, HTMLElement> => AbstractFactory(create);
