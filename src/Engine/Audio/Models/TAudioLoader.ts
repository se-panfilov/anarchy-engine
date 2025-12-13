import type { Howl } from 'howler';

import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TAudioResourceConfig } from './TAudioResourceConfig';

export type TAudioLoader = TAbstractLoader<Howl, TAudioResourceConfig>;
