import type { IActorConfig } from '@Engine/Domains/Actor';
import type { ICameraConfig } from '@Engine/Domains/Camera';
import type { IControlsConfig } from '@Engine/Domains/Controls';
import type { ILightConfig } from '@Engine/Domains/Light';
import type { ISceneConfig } from '@Engine/Domains/Scene';
import type { IVector2dConfig, IVector3dConfig } from '@Engine/Models';

export type IAbstractConfig = IActorConfig | ICameraConfig | IControlsConfig | ILightConfig | ISceneConfig | IVector2dConfig | IVector3dConfig | void;
