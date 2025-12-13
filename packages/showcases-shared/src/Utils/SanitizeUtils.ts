import type { Config } from 'dompurify';

export async function sanitizeMarkDown(content: string, config: Config = { USE_PROFILES: { html: true } }): Promise<string> {
  const DOMPurify = (await import('dompurify')).default;
  return DOMPurify.sanitize(content, config);
}
