import type { IWrapper } from '@/Engine/Abstract';
import type { IDestroyable, IWithTags } from '@/Engine/Mixins';
import type { IFog } from './IFog';

export type IFogWrapper = IWrapper<IFog> & IWithTags<string> & IDestroyable;
