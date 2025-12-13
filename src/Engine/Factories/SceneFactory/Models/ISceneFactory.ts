import type { Factory, SceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';

export type ISceneFactory = Factory<ISceneWrapper, Scene, SceneParams>;
