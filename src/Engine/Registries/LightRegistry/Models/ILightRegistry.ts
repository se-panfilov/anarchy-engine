import type { AbstractRegistry } from '@Engine/Registries';
import type { LightWrapper } from '@Engine/Wrappers';

export type ILightRegistry = ReturnType<typeof AbstractRegistry<ReturnType<typeof LightWrapper>>>;
