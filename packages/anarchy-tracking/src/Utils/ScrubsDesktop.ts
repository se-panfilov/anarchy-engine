import os from 'node:os';

import { isDefined, isString } from '@Anarchy/Shared/Utils';
import { HiddenField } from '@Anarchy/Tracking/Constants';
import type { ErrorEvent } from '@sentry/electron/main';

const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// eslint-disable-next-line spellcheck/spell-checker
const homedir: string = os.homedir();
// eslint-disable-next-line spellcheck/spell-checker
const homeDirRegexp: RegExp = new RegExp(escape(homedir.replace(/\\/g, '/')), 'g');
const replaceInString = (s?: string): string | undefined => (typeof s === 'string' ? s.replace(/\\/g, '/').replace(homeDirRegexp, HiddenField) : s);

export function scrubUserPathsDesktop(event: ErrorEvent): ErrorEvent {
  // eslint-disable-next-line functional/immutable-data
  if (event.message) event.message = replaceInString(event.message);

  event.exception?.values?.forEach((value: any): void => {
    value?.stacktrace?.frames?.forEach((f: any): void => {
      // eslint-disable-next-line functional/immutable-data
      f.filename = replaceInString(f.filename);
      // eslint-disable-next-line functional/immutable-data
      f.abs_path = replaceInString(f.abs_path);
      // eslint-disable-next-line functional/immutable-data
      f.module = replaceInString(f.module);
    });

    // eslint-disable-next-line functional/immutable-data
    if (value.value) value.value = replaceInString(value.value);
    // eslint-disable-next-line functional/immutable-data
    if (value.type) value.type = replaceInString(value.type);
  });

  if (isDefined(event.extra)) {
    Object.entries(event.extra).forEach(([key, value]): void => {
      // eslint-disable-next-line functional/immutable-data
      if (isDefined(event.extra) && isString(value)) event.extra[key] = replaceInString(value);
    });
  }

  return event;
}
