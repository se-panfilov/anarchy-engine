import type { TMaterialConfigOptions } from './TMaterialConfigOptions';
import type { TMaterialProps } from './TMaterialProps';

export type TMaterialConfig = Omit<TMaterialProps, 'options'> & Readonly<{ options?: TMaterialConfigOptions }>;
