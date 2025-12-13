import type { LoopType } from '@/Loop/Constants';

export const getMainLoopNameByType = (type: LoopType): string => `${type}_main_loop`;
