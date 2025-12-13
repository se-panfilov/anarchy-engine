import type { CreateFN } from '@Engine/Factories';
import type { RendererWrapper } from '@Engine/Wrappers';
import type { RendererParams } from '@Engine/Models';

export type ICreateRendererFn = CreateFN<ReturnType<typeof RendererWrapper>, RendererParams>;
