import type { Factory, SceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';
import type { SceneConfig } from '@Engine/Launcher/Models';

export type ISceneFactory = Factory<ISceneWrapper, Scene, SceneParams, SceneConfig>;
