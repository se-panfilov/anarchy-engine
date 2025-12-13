export function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function kebabToCamel(input: string): string {
  if (!input.includes('-')) return input;

  return input
    .toLowerCase()
    .split('-')
    .map((part: string, index: number): string => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}
