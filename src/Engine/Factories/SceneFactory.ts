import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { Factory } from '@Engine/Models/Factory';
import type { SceneParams } from '@Engine/Models/SceneParams';

const create = (params: SceneParams): ReturnType<typeof SceneWrapper> => SceneWrapper(params);

export const SceneFactory = (): Factory<ReturnType<typeof SceneWrapper>, SceneParams> => AbstractFactory(create);
