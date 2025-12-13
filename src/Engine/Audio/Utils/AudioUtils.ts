import type { TAudio3dConfig, TAudioConfig } from '@/Engine/Audio/Models';

export const isAudio3dConfig = (config: TAudioConfig | TAudio3dConfig): config is TAudio3dConfig => (config as TAudio3dConfig).position !== undefined;
