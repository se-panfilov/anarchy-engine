import type { InputTag } from '@/Engine/Domains/Input/Constants';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type IInputParams = IWithReadonlyTags<InputTag>;
