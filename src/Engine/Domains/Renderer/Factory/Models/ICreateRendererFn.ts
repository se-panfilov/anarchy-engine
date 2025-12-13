import type { ICreateFN } from '@Engine/Factories';
import type { IRendererParams } from '@Engine/Models';
import type { IRendererWrapper } from '@Engine/Wrappers';

export type ICreateRendererFn = ICreateFN<IRendererWrapper, IRendererParams>;
