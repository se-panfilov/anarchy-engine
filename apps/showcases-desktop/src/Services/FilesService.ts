import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import * as path from 'node:path';

import type { AllowedFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService } from '@Showcases/Desktop/Models';
import type { App } from 'electron';
import type { FileHandle } from 'fs/promises';
import { nanoid } from 'valibot';

// TODO DESKTOP: Finalize this service, use it in SettingsService and DocsService. Test all methods
export function FilesService(app: App): TFilesService {
  const encoding: BufferEncoding = 'utf-8';

  function getPathToFile(dir: AllowedFolders, fileName: string): string | never {
    const folder: string = path.resolve(app.getPath(dir));
    const full: string = path.normalize(path.join(folder, fileName));

    //Security: ensure the resolved path is within the base directory
    const rel: string = path.relative(folder, full);
    if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('[DESKTOP]: Forbidden path access');
    return full;
  }

  async function readTextFile(filePath: string): Promise<string> | never {
    try {
      return await readFile(filePath, encoding);
    } catch (e: any) {
      throw new Error(`[DESKTOP]: Failed to read "${filePath}": ${e?.message ?? 'unknown'}`);
    }
  }

  async function writeToHandle(fh: FileHandle, content: string): Promise<void> {
    try {
      await fh.truncate(0);
      await fh.writeFile(content, encoding);
      await fh.sync(); // ensure flushed to disk
    } finally {
      await fh.close();
    }
  }

  async function removeTempFile(tmpPath: string): Promise<void> {
    try {
      await rm(tmpPath, { force: true });
    } catch {
      console.error(`[DESKTOP]: Failed to remove temp file: ${tmpPath}`);
    }
  }

  async function writeFile(dir: AllowedFolders, fileName: string, content: string): Promise<boolean> | never {
    const folder: string = app.getPath(dir);
    const finalPath: string = `${folder}/${fileName}`;
    const tmpPath: string = `${dir}__${nanoid()}.tmp`;

    try {
      await mkdir(folder, { recursive: true });
      const fh: FileHandle = await open(tmpPath, 'w', 0o600);
      await writeToHandle(fh, content);
      await rename(tmpPath, finalPath);
      return true;
    } catch (e: any) {
      await removeTempFile(tmpPath);
      throw new Error(`[DESKTOP]: Failed to write "${finalPath}: ${e?.message ?? 'unknown'}`);
    }
  }

  async function readJsonFile<T>(filePath: string, validator?: (v: unknown) => v is T): Promise<T> | never {
    const text = await readTextFile(filePath);
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(`[DESKTOP]: Invalid JSON in "${filePath}"`);
    }

    if (validator && !validator(parsed)) throw new Error(`[DESKTOP]: Invalid JSON structure in "${filePath}"`);

    return parsed as T;
  }

  return {
    getPathToFile,
    readFile: readTextFile,
    readJsonFile,
    writeFile
  };
}
