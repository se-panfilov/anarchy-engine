import type { Config } from 'dompurify';
import DOMPurify from 'isomorphic-dompurify';

export async function sanitizeMarkDown(content: string, config: Config = { USE_PROFILES: { html: true } }): Promise<string> | never {
  return DOMPurify.sanitize(content, config);
}
