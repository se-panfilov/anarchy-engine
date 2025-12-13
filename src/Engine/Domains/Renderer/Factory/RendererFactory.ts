import { ambientContext } from '@Engine/Context';
import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';

import type { IRendererFactory, IRendererParams, IRendererWrapper } from '../Models';
import { RendererWrapper } from '../Wrapper';

const create = (params: IRendererParams): IRendererWrapper => RendererWrapper(params, ambientContext.screenSizeWatcher);
const factory: IFactory<IRendererWrapper, IRendererParams> = { ...AbstractFactory('renderer'), create };
export const RendererFactory = (): IRendererFactory => ({ ...factory, ...destroyableMixin(factory) });
