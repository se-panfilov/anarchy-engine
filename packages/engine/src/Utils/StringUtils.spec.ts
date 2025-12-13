import { describe, expect, it } from 'vitest';

import { camelToKebab, kebabToCamel } from './StringUtils';

describe('StringUtils', () => {
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

  describe('kebabToCamel', () => {
    it('converts simple kebab-case to camelCase', () => {
      expect(kebabToCamel('kebab-case')).toBe('kebabCase');
    });

    it('converts UPPER-kebab-case to camelCase', () => {
      expect(kebabToCamel('KEBAB-CASE')).toBe('kebabCase');
    });

    it('handles strings with multiple hyphens correctly', () => {
      expect(kebabToCamel('kebab-case-example')).toBe('kebabCaseExample');
      expect(kebabToCamel('kebab-case-example-some-other-then')).toBe('kebabCaseExampleSomeOtherThen');
    });

    it('leaves strings without hyphens unchanged', () => {
      expect(kebabToCamel('camelCase')).toBe('camelCase');
      expect(kebabToCamel('CamelCase')).toBe('CamelCase');
      // eslint-disable-next-line spellcheck/spell-checker
      expect(kebabToCamel('nocaseatall')).toBe('nocaseatall');
    });

    it('handles strings with numbers correctly', () => {
      expect(kebabToCamel('version1-update')).toBe('version1Update');
      expect(kebabToCamel('234-version1-update')).toBe('234Version1Update');
    });

    it('handles mixed strings with numbers and hyphens', () => {
      expect(kebabToCamel('version1-update2-feature')).toBe('version1Update2Feature');
      expect(kebabToCamel('version122-update233-feature')).toBe('version122Update233Feature');
    });
  });
});
