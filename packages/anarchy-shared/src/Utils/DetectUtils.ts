import type { TBrowserInfo } from '@Anarchy/Shared/Models';
// eslint-disable-next-line spellcheck/spell-checker
import Bowser from 'bowser';

// eslint-disable-next-line spellcheck/spell-checker
export const getBrowserInfo = (): TBrowserInfo => Bowser.parse(window.navigator.userAgent);
