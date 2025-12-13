import { standardLoopService } from '@/Engine/Domains/Loop';
import type { IMoverService } from '@/Engine/Services/MoverService/Models';

import { defaultMoverServiceConfig } from './Constants';
import { MoverService } from './MoverService';

export const standardMoverService: IMoverService = MoverService(standardLoopService, defaultMoverServiceConfig);
