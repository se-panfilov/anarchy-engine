import type { ICreateFN } from '@Engine/Domains/Abstract';

import type { IRendererParams } from './IRendererParams';
import type { IRendererWrapper } from './IRendererWrapper';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
