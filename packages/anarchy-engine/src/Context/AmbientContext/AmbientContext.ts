import { ContainerDecorator } from '@hellpig/anarchy-engine/Global';

import type { TAmbientContext } from './Models';

export const ambientContext: TAmbientContext = { globalContainer: ContainerDecorator(window) };
