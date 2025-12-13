import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import { SceneWrapper } from '@Engine/Wrappers';
import type { Factory, SceneParams } from '@Engine/Models';

const create = (params: SceneParams): ReturnType<typeof SceneWrapper> => SceneWrapper(params);

export const SceneFactory = (): Factory<ReturnType<typeof SceneWrapper>, SceneParams> => AbstractFactory(create);
