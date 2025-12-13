import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import * as path from 'node:path';

import type { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import { AllowedAppFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService } from '@Showcases/Desktop/Models';
import type { App } from 'electron';
import type { FileHandle } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';

// TODO DESKTOP: Finalize this service, use it in SettingsService and DocsService. Test all methods
export function FilesService(app: App): TFilesService {
  const encoding: BufferEncoding = 'utf-8';

  function getPathToFile(fileName: string, dir: AllowedSystemFolders | AllowedAppFolders): string | never {
    const folder: string = isAppFolder(dir) ? join(app.getAppPath(), dir) : path.resolve(app.getPath(dir));
    const full: string = path.normalize(path.join(folder, fileName));

    //Security: ensure the resolved path is within the base directory
    const rel: string = path.relative(folder, full);
    if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('[Desktop] Forbidden path access');
    return full;
  }

  async function readTextFile(fileName: string, dir: AllowedSystemFolders | AllowedAppFolders): Promise<string> | never {
    try {
      return await readFile(dir ? getPathToFile(fileName, dir) : fileName, encoding);
    } catch (e: any) {
      throw new Error(`[Desktop] Failed to read "${fileName}": ${e?.message ?? 'unknown'}`);
    }
  }

  async function writeFile(fileName: string, dir: AllowedSystemFolders, content: string): Promise<boolean> | never {
    const folder: string = app.getPath(dir);
    const finalPath: string = `${folder}/${fileName}`;
    const tmpPath: string = `${fileName}__${dir}__${nanoid()}.tmp`;

    try {
      await mkdir(folder, { recursive: true });
      const fh: FileHandle = await open(tmpPath, 'w', 0o600);
      await writeToHandle(fh, content, encoding);
      await rename(tmpPath, finalPath);
      return true;
    } catch (e: any) {
      await removeTempFile(tmpPath);
      throw new Error(`[Desktop] Failed to write "${finalPath}: ${e?.message ?? 'unknown'}`);
    }
  }

  async function readFileAsJson<T>(fileName: string, dir: AllowedSystemFolders | AllowedAppFolders, validator?: (v: unknown) => v is T): Promise<T> | never {
    const content: string = await readTextFile(fileName, dir);
    const parsed = JSON.parse(content);

    if (validator && !validator(parsed)) throw new Error(`[Desktop] Invalid JSON structure in "${fileName}"`);

    return parsed as T;
  }

  return {
    getPathToFile,
    readFile: readTextFile,
    readFileAsJson,
    writeFile
  };
}

function isAppFolder(dir: AllowedAppFolders | unknown): dir is AllowedAppFolders {
  return Object.values(AllowedAppFolders).includes(dir as AllowedAppFolders);
}

async function writeToHandle(handle: FileHandle, content: string, encoding: BufferEncoding): Promise<void> {
  try {
    await handle.truncate(0);
    await handle.writeFile(content, encoding);
    await handle.sync(); // ensure flushed to disk
  } finally {
    await handle.close();
  }
}

async function removeTempFile(tmpPath: string): Promise<void> {
  try {
    await rm(tmpPath, { force: true });
  } catch {
    console.error(`[Desktop] Failed to remove temp file: ${tmpPath}`);
  }
}
