export const getQueryParams = (urlString: string = window.location.href): Readonly<Record<string, string>> => {
  const url = new URL(urlString);
  const entries = Array.from(url.searchParams.entries());
  return Object.fromEntries(entries);
};

export function buildPublicUrl(baseUrl: string, relPath: string): string {
  const base: URL = new URL(baseUrl, window.location.origin);
  const clean: string = relPath.replace(/^\/+/, '');
  return new URL(clean, base).toString();
}
