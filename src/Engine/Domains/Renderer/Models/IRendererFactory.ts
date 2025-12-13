import type { IFactory } from '@Engine/Domains/Abstract';

import type { IRendererParams } from './IRendererParams';
import type { IRendererWrapper } from './IRendererWrapper';

export type IRendererFactory = IFactory<IRendererWrapper, IRendererParams>;
