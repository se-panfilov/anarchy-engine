import type { TBrowserInfo } from '@Anarchy/Shared/Models';
// eslint-disable-next-line spellcheck/spell-checker
import Bowser from 'bowser';

export function getBrowserInfo(): TBrowserInfo {
  // eslint-disable-next-line spellcheck/spell-checker
  return Bowser.parse(window.navigator.userAgent);
}
