import fs from 'node:fs/promises';
import path from 'node:path';

import type { TNoticeUtilsService, TTemplateParsedEntry } from '@Anarchy/Legal/Models';

export function NoticeUtilsService(): TNoticeUtilsService {
  function splitEntriesFromMarkdown(md: string): ReadonlyArray<string> {
    const parts: string[] = md.split(/\r?\n---\r?\n/g);
    return parts.filter((chunk) => /^##\s+.+/m.test(chunk));
  }

  function parseHeaderLine(chunk: string): { name: string; version: string } | undefined {
    const m: RegExpExecArray | null = /^##\s+(.+?)\s*$/m.exec(chunk);
    if (!m) return undefined;
    const full: string = m[1].trim(); // e.g. "@babel/core@7.27.1"
    const at: number = full.lastIndexOf('@');
    if (at <= 0 || at === full.length - 1) return undefined;
    const name: string = full.slice(0, at).trim();
    const version: string = full.slice(at + 1).trim();
    if (!name || !version) return undefined;
    return { name, version };
  }

  function parseOneEntry(chunk: string): TTemplateParsedEntry | undefined {
    const header: { name: string; version: string } | undefined = parseHeaderLine(chunk);
    if (!header) return undefined;
    const { name, version } = header;
    const id = `${name}@${version}`;

    const field = (label: string): string | undefined => {
      const re = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)\\s*$`, 'mi');
      const m: RegExpExecArray | null = re.exec(chunk);
      return m ? m[1].trim() : undefined;
    };

    const licensesStr: string = field('License') ?? 'UNKNOWN';
    const licenses: string[] = licensesStr
      .split(',')
      .map((s: string): string => s.trim())
      .filter(Boolean);

    const repository: string | undefined = field('Repository');
    const url: string | undefined = field('URL');
    const publisher = field('Publisher')
      ?.replace(/\s+<[^>]+>\s*$/, '')
      .trim();
    const path: string | undefined = field('Path');

    // License text: tail after the first blank line following the header+KV area
    let licenseText: string | undefined = undefined;
    {
      const lines: string[] = chunk.split(/\r?\n/);
      const firstBlankAfterHeaderIdx: number = ((): number => {
        let seenHeader: boolean = false;
        return lines.findIndex((ln: string): boolean => {
          if (ln.startsWith('## ')) {
            seenHeader = true;
            return false;
          }
          return seenHeader && ln.trim() === '';
        });
      })();
      const startIdx: number = firstBlankAfterHeaderIdx >= 0 ? firstBlankAfterHeaderIdx + 1 : lines.length;
      const tail: string = lines.slice(startIdx).join('\n').trim();
      if (tail && !/^_No license text file found;/m.test(tail)) licenseText = tail;
    }

    const inferredCopyright: string | undefined = ((): string | undefined => {
      if (licenseText) {
        const ln: string | undefined = licenseText.split(/\r?\n/).find((l: string): boolean => /^\s*(?:copyright|\(c\)|©)\s+/i.test(l));
        if (ln) return ln.trim();
      }
      return publisher?.trim();
    })();

    return {
      id,
      name,
      version,
      licenses,
      repository: repository ?? undefined,
      url: url ?? undefined,
      publisher: publisher ?? undefined,
      path: path ?? undefined,
      licenseText,
      inferredCopyright
    };
  }

  function parseThirdPartyMarkdown(md: string): ReadonlyArray<TTemplateParsedEntry> {
    const chunks: ReadonlyArray<string> = splitEntriesFromMarkdown(md);
    const entries: TTemplateParsedEntry[] = chunks.flatMap((ch) => {
      const e: TTemplateParsedEntry | undefined = parseOneEntry(ch);
      return e ? [e] : [];
    });
    return entries.toSorted((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  }

  function collectAllHeadingIds(md: string): ReadonlySet<string> {
    const re = /^##\s+(.+?)\s*$/gm;
    return [...md.matchAll(re)].reduce<Set<string>>((ids: Set<string>, m: RegExpExecArray) => {
      const full: string = String(m[1]).trim();
      const at: number = full.lastIndexOf('@');
      if (at > 0 && at < full.length - 1) {
        ids.add(`${full.slice(0, at).trim()}@${full.slice(at + 1).trim()}`);
      }
      return ids;
    }, new Set<string>());
  }

  async function findUpstreamNoticeFile(dir: string): Promise<string | undefined> {
    try {
      const list: string[] = await fs.readdir(dir);
      const candidate = list.find((f) => /^(notice|notice\.txt|notice\.md)$/i.test(f));
      return candidate ? path.join(dir, candidate) : undefined;
    } catch {
      return undefined;
    }
  }

  async function loadUpstreamNotice(dir: string, maxBytes: number): Promise<string | undefined> {
    const p = await findUpstreamNoticeFile(dir);
    if (!p) return undefined;
    try {
      const stat = await fs.stat(p);
      const text: string = await fs.readFile(p, 'utf8');
      if (stat.size > maxBytes) {
        return `Upstream NOTICE is too large (${stat.size} bytes); truncated.\n\n` + text.slice(0, maxBytes);
      }
      return text;
    } catch {
      return undefined;
    }
  }

  return {
    collectAllHeadingIds,
    parseThirdPartyMarkdown,
    loadUpstreamNotice
  };
}
