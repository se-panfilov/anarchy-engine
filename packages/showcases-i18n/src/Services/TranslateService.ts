import type { IntlCache } from '@formatjs/intl';
import { createIntl, createIntlCache } from '@formatjs/intl';

export function TranslateService() {
  const cache: IntlCache = createIntlCache();

  const intl = createIntl(
    {
      locale: 'fr',
      defaultLocale: 'en',
      messages: messagesInFrench
    },
    cache
  );

  function translate(value: string, params: Record<string, string>): string {
    return intl.formatMessage({ id: value }, params);
  }

  return {
    translate
  };
}
// Translated messages in French with matching IDs to what you declared
const messagesInFrench = {
  myMessage: "Aujourd'hui, nous sommes le {ts, date, ::yyyyMMdd}"
};

console.log(
  intl.formatMessage(
    {
      // Matching ID as above
      id: 'myMessage',
      // Default Message in English
      defaultMessage: 'Today is {ts, date, ::yyyyMMdd}'
    },
    { ts: Date.now() }
  )
);

console.log(intl.formatNumber(19, { style: 'currency', currency: 'EUR' }));
