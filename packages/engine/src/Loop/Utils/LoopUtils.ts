import type { LoopType } from '@Engine/Loop/Constants';

export const getMainLoopNameByType = (type: LoopType): string => `${type}_main_loop`;
