import { ambientContext } from '@Engine/Context';
import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin } from '@Engine/Domains/Abstract';

import type { IRendererFactory, IRendererParams, IRendererWrapper } from '../Models';
import { RendererWrapper } from '../Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: IFactory<IRendererWrapper, IRendererParams> = { ...AbstractFactory('renderer'), create };
export const RendererFactory = (): IRendererFactory => ({ ...factory, ...destroyableFactoryMixin(factory) });
