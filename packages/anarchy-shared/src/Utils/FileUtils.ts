import { FileSizes } from '@Anarchy/Shared/Constants';

import { isDefined } from './CheckUtils';

export function getHumanReadableMemorySize(bytes: number, decimals: number = 2): string {
  if (!+bytes) return '0 Bytes';
  const k: number = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;

  const i: number = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${Object.values(FileSizes)[i]}`;
}

export function getFileExtension(name: string): string | undefined {
  const extension: RegExpExecArray | null = /^.+\.([^.]+)$/.exec(name);
  return isDefined(extension) ? extension[1] : undefined;
}

export const toPosix = (s: string): string => s.replace(/\\/g, '/');
