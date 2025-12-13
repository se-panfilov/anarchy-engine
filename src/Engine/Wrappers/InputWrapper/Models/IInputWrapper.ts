import type { AbstractWrapper } from '@Engine/Wrappers';

export type IInputWrapper = ReturnType<typeof AbstractWrapper<MOCK_INPUT_TYPE>>;

export type MOCK_INPUT_TYPE = unknown;
