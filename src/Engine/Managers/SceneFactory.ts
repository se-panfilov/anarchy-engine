import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import type { Factory } from '@Engine/Models/Factory';

const create = (name: string): ReturnType<typeof SceneWrapper> => SceneWrapper(name);

export const SceneFactory = (): Factory<ReturnType<typeof SceneWrapper>, string> => AbstractFactory(create);
