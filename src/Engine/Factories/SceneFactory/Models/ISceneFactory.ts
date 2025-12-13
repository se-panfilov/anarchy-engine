import type { IFactory, ISceneParams } from '@Engine/Models';
import type { ISceneWrapper } from '@Engine/Wrappers';
import type { Scene } from 'three';
import type { ISceneConfig } from '@Engine/Launcher/Models';

export type ISceneFactory = IFactory<ISceneWrapper, Scene, ISceneParams, ISceneConfig>;
