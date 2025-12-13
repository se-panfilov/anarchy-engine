import type { ILightAccessors } from '@Engine/Wrappers';
import type { AmbientLight, DirectionalLight } from 'three';
import type { IWrapper } from '@Engine/Models';

export type ILightWrapper = IWrapper<AmbientLight | DirectionalLight> & ILightAccessors;
