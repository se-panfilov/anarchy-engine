import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import type { Factory, RendererParams } from '@Engine/Models';

const create = (params: RendererParams): ReturnType<typeof RendererWrapper> => RendererWrapper(params);

export const RendererFactory = (): Factory<ReturnType<typeof RendererWrapper>, RendererParams> =>
  AbstractFactory(create);
