import { ambientContext } from '@Engine/Context';
import { AbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';

import type { ICreateRendererFn, IRendererFactory, IRendererParams, IRendererWrapper } from '../Models';
import { RendererWrapper } from '../Wrapper';

const create: ICreateRendererFn = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
export const RendererFactory = (): IRendererFactory => AbstractFromConfigWrapperFactory('renderer', create);
