import type { Key } from 'ts-key-enum';

import type { KeyCode, KeysExtra } from '@/Engine/Keyboard/Constants';

export type TGameKey = KeyCode | KeysExtra | Key;
