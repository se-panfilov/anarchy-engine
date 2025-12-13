import type { StackFrame } from '@sentry/browser';
import { rewriteFramesIntegration } from '@sentry/browser';
import type { Integration } from '@sentry/core';

export const rewriteFramesIntegrationBrowser = (): Integration =>
  rewriteFramesIntegration({
    // eslint-disable-next-line spellcheck/spell-checker
    iteratee: (frame: StackFrame): StackFrame => {
      const f: StackFrame = { ...(frame as any) } as any;
      if (!f.filename) return f;

      const name: string = String(f.filename).replace(/\\/g, '/');
      // already normalized
      if (name.startsWith('app:///')) return f;

      // Try to cut to the first "/dist/" occurrence so we get app:///dist/...
      const m: RegExpMatchArray | null = name.match(/^file:\/+.*?(\/dist\/.*)$/);
      if (m) {
        // eslint-disable-next-line functional/immutable-data
        (f as any).filename = `app:///${m[1].replace(/^\/+/, '')}`;
        if (f.abs_path) {
          const abs: string = String(f.abs_path).replace(/\\/g, '/');
          const mm: RegExpMatchArray | null = abs.match(/^file:\/+.*?(\/dist\/.*)$/);
          if (mm) {
            // eslint-disable-next-line functional/immutable-data
            (f as any).abs_path = `app:///${mm[1].replace(/^\/+/, '')}`;
          }
        }
        return f;
      }

      return f;
    }
  });
