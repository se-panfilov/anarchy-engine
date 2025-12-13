import { ContainerDecorator } from '@/Global';

import type { TAmbientContext } from './Models';

export const ambientContext: TAmbientContext = { globalContainer: ContainerDecorator(window) };
