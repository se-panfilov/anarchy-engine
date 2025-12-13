import { camelToKebab } from './StringUtils';

describe('camelToKebab', () => {
  it('converts simple camelCase to kebab-case', () => {
    expect(camelToKebab('camelCase')).toBe('camel-case');
  });

  it('handles strings with multiple uppercase letters correctly', () => {
    expect(camelToKebab('camelCaseExample')).toBe('camel-case-example');
    expect(camelToKebab('camelCaseExampleSomeOtherThen')).toBe('camel-case-example-some-other-then');
  });

  it('leaves strings without uppercase letters unchanged', () => {
    expect(camelToKebab('kebab')).toBe('kebab');
    expect(camelToKebab('Kebab')).toBe('kebab');
    expect(camelToKebab('Kebab-one')).toBe('kebab-one');
  });

  it('handles strings with numbers correctly', () => {
    expect(camelToKebab('version1Update')).toBe('version1-update');
    expect(camelToKebab('234version1Update')).toBe('234version1-update');
  });

  it('handles mixed strings with numbers and uppercase letters', () => {
    expect(camelToKebab('version1Update2Feature')).toBe('version1-update2-feature');
    expect(camelToKebab('version122Update233Feature')).toBe('version122-update233-feature');
  });
});
