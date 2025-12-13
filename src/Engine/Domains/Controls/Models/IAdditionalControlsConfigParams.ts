import type { IAppCanvas } from '@Engine/Domains/App';
import type { ICameraRegistry } from '@Engine/Domains/Camera';

export type IAdditionalControlsConfigParams = { cameraRegistry: ICameraRegistry; canvas: IAppCanvas };
