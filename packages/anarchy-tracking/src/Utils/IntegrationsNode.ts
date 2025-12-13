import { toPosix } from '@Anarchy/Shared/Utils';
import type { StackFrame } from '@sentry/core';
import { rewriteFramesIntegration } from '@sentry/core';

//Important: if you use this, then upload source maps with --url-prefix "app:///"
export const rewriteFramesIntegrationNode = (options?: any): any => {
  let root = options?.root;

  try {
    if (!root && typeof process !== 'undefined' && (process as any).resourcesPath) {
      root = (process as any).resourcesPath as string;
    }
    if (!root) root = __dirname;
  } catch {
    // ignore
  }

  const rootPosix: string | undefined = root ? toPosix(root) : undefined;

  return rewriteFramesIntegration({
    root: rootPosix,
    // eslint-disable-next-line spellcheck/spell-checker
    iteratee: (frame: StackFrame): StackFrame => {
      if (!frame || !frame.filename) return frame;
      const name = toPosix(frame.filename);

      // Transform any absolute/file paths related to the app into app:///
      // 1) If SDK already made app:/// — leave it
      if (name.startsWith('app:///')) return frame;

      // 2) If the path is under root/resourcesPath - replace the prefix with app:///
      if (rootPosix && name.startsWith(rootPosix)) {
        // eslint-disable-next-line functional/immutable-data
        frame.filename = 'app:///' + name.slice(rootPosix.length).replace(/^\/+/, '');
        return frame;
      }

      // 3) The path is inside asar
      const asarIdx: number = name.indexOf('/app.asar/');
      if (asarIdx >= 0) {
        // eslint-disable-next-line functional/immutable-data
        frame.filename = 'app:///' + name.slice(asarIdx + '/app.asar/'.length);
        return frame;
      }

      // 4) file:// URLs → app:///
      if (name.startsWith('file://')) {
        // eslint-disable-next-line functional/immutable-data
        frame.filename = 'app:///' + name.replace(/^file:\/+/, '');
        return frame;
      }

      return frame;
    }
  });
};
