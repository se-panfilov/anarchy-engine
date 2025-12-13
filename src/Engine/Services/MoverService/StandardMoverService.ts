import { defaultMoverServiceConfig } from './Constants';
import { MoverService } from './MoverService';

// TODO (S.Panfilov) add loop
export const StandardMoverService = MoverService(loop, defaultMoverServiceConfig)
