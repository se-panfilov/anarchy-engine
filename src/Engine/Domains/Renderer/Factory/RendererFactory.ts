import { ambientContext } from '@Engine/Context';
import type { ICreateRendererFn, IRendererFactory, IRendererParams, IRendererWrapper } from '@Engine/Domains/Renderer/Models';
import { RendererWrapper } from '@Engine/Domains/Renderer/Wrapper';
import { AbstractFromConfigWrapperFactory } from '@Engine/Factories';

const create: ICreateRendererFn = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFromConfigWrapperFactory('renderer', create);
