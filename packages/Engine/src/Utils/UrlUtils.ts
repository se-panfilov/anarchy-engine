export const getQueryParams = (urlString: string = window.location.href): Readonly<Record<string, string>> => {
  const url = new URL(urlString);
  const entries = Array.from(url.searchParams.entries());
  return Object.fromEntries(entries);
};
