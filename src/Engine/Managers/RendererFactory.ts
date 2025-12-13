import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import { RendererWrapper } from '@Engine/Wrappers/RendererWrapper';
import type { Factory } from '@Engine/Models/Factory';
import type { RendererParams } from '@Engine/Models/RendererParams';

const create = (params: RendererParams): ReturnType<typeof RendererWrapper> => RendererWrapper(params);

export const RendererFactory = (): Factory<ReturnType<typeof RendererWrapper>, RendererParams> =>
  AbstractFactory(create);
