import type { TLocaleId } from '@Anarchy/i18n';
import { describe, expect, it } from 'vitest';

import { getPreferLocaleId } from './Locales';

describe('Locales', (): void => {
  const enUS: TLocaleId = 'en-US';
  const enCA: TLocaleId = 'en-CA';
  const enGB: TLocaleId = 'en-GB';
  const nlNl: TLocaleId = 'nl-NL';
  // eslint-disable-next-line spellcheck/spell-checker
  const srCyrlRs: TLocaleId = 'sr-Cyrl-RS';
  const zhHansCN: TLocaleId = 'zh-Hans-CN';
  // eslint-disable-next-line spellcheck/spell-checker
  const zhHantHk: TLocaleId = 'zh-Hant-HK';
  // eslint-disable-next-line spellcheck/spell-checker
  const zhHantTw: TLocaleId = 'zh-Hant-TW';

  describe('getPreferLocaleId', (): void => {
    describe('Exact match', (): void => {
      it('should return preferred localeId', (): void => {
        expect(getPreferLocaleId([enUS, nlNl], [enUS, nlNl], enCA)).toBe(enUS);
        expect(getPreferLocaleId([nlNl, enUS], [enUS, nlNl], enCA)).toBe(nlNl);
        expect(getPreferLocaleId([zhHansCN, nlNl], [enUS, nlNl, zhHansCN], enUS)).toBe(zhHansCN);
      });

      it('should return preferred localeId (locales with script)', (): void => {
        expect(getPreferLocaleId([zhHansCN, nlNl], [enUS, zhHansCN], enUS)).toBe(zhHansCN);
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([srCyrlRs, nlNl], [srCyrlRs, enUS], enUS)).toBe(zhHansCN);
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([zhHansCN, zhHantHk], [enUS, nlNl, zhHantHk], enUS)).toBe(zhHantHk);
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([zhHansCN, zhHantHk], [zhHansCN, nlNl, zhHantHk], enUS)).toBe(zhHansCN);
      });
    });

    describe('Partial match (lang only)', (): void => {
      it('should return localeId by lang', (): void => {
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([enCA], [zhHantHk, enUS, nlNl], nlNl)).toBe(enUS);

        expect(getPreferLocaleId([enCA, enGB], [nlNl, zhHansCN, enUS], nlNl)).toBe(enUS);
      });

      it('should return localeId by lang (locales with script)', (): void => {
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([zhHantHk, zhHantTw], [zhHansCN, enUS, nlNl], nlNl)).toBe(zhHansCN);
        // eslint-disable-next-line spellcheck/spell-checker
        expect(getPreferLocaleId([enGB, zhHantHk], [nlNl, zhHantHk, zhHantTw], nlNl)).toBe(enUS);
      });
    });

    describe('No match (fallback locale)', (): void => {
      it('should return the fallback locale', (): void => {
        expect(getPreferLocaleId([enUS, nlNl], [], enCA)).toBe(enCA);
        expect(getPreferLocaleId([zhHansCN], [enUS, nlNl], enCA)).toBe(enCA);
        expect(getPreferLocaleId([], [enUS, nlNl], enCA)).toBe(enCA);
        expect(getPreferLocaleId([], [], enCA)).toBe(enCA);
      });
    });
  });
});
