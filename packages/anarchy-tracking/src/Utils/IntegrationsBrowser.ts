import { isNotDefined, toPosix } from '@Anarchy/Shared/Utils';
import type { StackFrame } from '@sentry/browser';
import { rewriteFramesIntegration } from '@sentry/browser';
import type { Integration } from '@sentry/core';

export const rewriteFramesIntegrationBrowser = (): Integration =>
  rewriteFramesIntegration({
    // eslint-disable-next-line spellcheck/spell-checker
    iteratee: (frame: StackFrame): StackFrame => {
      if (isNotDefined(frame?.filename)) return frame;
      const name: string = toPosix(frame.filename);
      // eslint-disable-next-line functional/immutable-data
      if (name.startsWith('file://')) frame.filename = 'app:///' + name.replace(/^file:\/\+/, '');
      return frame;
    }
  });
