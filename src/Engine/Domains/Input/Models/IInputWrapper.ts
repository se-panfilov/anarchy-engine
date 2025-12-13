import type { IWrapper } from '@/Engine/Domains/Abstract';
import type { InputTag, MOCK_INPUT_TYPE } from '@/Engine/Domains/Input/Constants';
import type { IWithTags } from '@/Engine/Mixins';

export type IInputWrapper = IWrapper<MOCK_INPUT_TYPE> & IWithTags<InputTag>;
