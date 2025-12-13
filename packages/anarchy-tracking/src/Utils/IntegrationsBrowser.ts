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

      // Prefer the LAST "/dist/" occurrence so nested paths like
      // ".../dist/mac-arm64/.../app.asar/dist/dist-desktop/..." map to
      // "app:///dist/dist-desktop/..." which matches uploaded urlPrefix/app paths.
      const cutToLastDist = (p: string): string | null => {
        const idx: number = p.lastIndexOf('/dist/');
        if (idx < 0) return null;
        return p.slice(idx).replace(/^\/+/, '');
      };

      const relFromLast = cutToLastDist(name);
      if (relFromLast) {
        // eslint-disable-next-line functional/immutable-data
        (f as any).filename = `app:///${relFromLast}`;
        if (f.abs_path) {
          const abs: string = String(f.abs_path).replace(/\\/g, '/');
          const absRel: string | null = cutToLastDist(abs);
          if (absRel) {
            // eslint-disable-next-line functional/immutable-data
            (f as any).abs_path = `app:///${absRel}`;
          }
        }
        return f;
      }

      return f;
    }
  });
