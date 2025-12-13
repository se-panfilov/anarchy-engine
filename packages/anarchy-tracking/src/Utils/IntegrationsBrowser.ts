import { toPosix } from '@Anarchy/Shared/Utils';
import type { StackFrame } from '@sentry/browser';
import { rewriteFramesIntegration } from '@sentry/browser';
import type { Integration } from '@sentry/core';

const stripSourceNote = (s: string) => s.replace(/\s*\?\([^)]*\)\s*$/u, '').replace(/\s*\([^)]*\)\s*$/u, '');
const stripFileScheme = (s: string) => s.replace(/^file:\/+/u, '');

export const rewriteFramesIntegrationBrowser = (): Integration =>
  rewriteFramesIntegration({
    // eslint-disable-next-line spellcheck/spell-checker
    iteratee: (frame: StackFrame): StackFrame => {
      if (!frame?.filename) return frame;

      let name: string = toPosix(String(frame.filename));
      name = stripSourceNote(name);

      if (name.startsWith('app:///')) {
        // eslint-disable-next-line functional/immutable-data
        frame.filename = stripSourceNote(name);
        if (frame.abs_path && typeof frame.abs_path === 'string') {
          // eslint-disable-next-line functional/immutable-data
          frame.abs_path = stripSourceNote(toPosix(frame.abs_path));
        }
        return frame;
      }

      if (name.startsWith('file://')) {
        const withoutScheme = stripFileScheme(name);
        // eslint-disable-next-line functional/immutable-data
        frame.filename = 'app:///' + stripSourceNote(withoutScheme.replace(/^\/+/u, ''));
        if (frame.abs_path && typeof frame.abs_path === 'string') {
          const abs = stripFileScheme(stripSourceNote(toPosix(frame.abs_path)));
          // eslint-disable-next-line functional/immutable-data
          frame.abs_path = 'app:///' + abs.replace(/^\/+/u, '');
        }
        return frame;
      }

      frame.filename = stripSourceNote(name);
      if (frame.abs_path && typeof frame.abs_path === 'string') {
        frame.abs_path = stripSourceNote(toPosix(frame.abs_path));
      }
      return frame;
    }
  });
