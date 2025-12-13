import type { ICreateFN } from '@Engine/Factories';
import type { IRendererWrapper } from '@Engine/Wrappers';
import type { IRendererParams } from '@Engine/Models';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
