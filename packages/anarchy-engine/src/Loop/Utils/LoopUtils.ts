import type { LoopType } from '@hellpig/anarchy-engine/Loop/Constants';

export const getMainLoopNameByType = (type: LoopType): string => `${type}_main_loop`;
