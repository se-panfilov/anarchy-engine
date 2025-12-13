import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import { InputWrapper } from '@Engine/Wrappers/InputWrapper';
import type { InputParams } from '@Engine/Models/InputParams';
import type { Factory } from '@Engine/Models/Factory';

const create = (params: InputParams): ReturnType<typeof InputWrapper> => InputWrapper(params);

export const InputFactory = (): Factory<ReturnType<typeof InputWrapper>, InputParams> => AbstractFactory(create);
