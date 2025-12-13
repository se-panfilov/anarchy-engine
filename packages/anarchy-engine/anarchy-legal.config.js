import base from '../../anarchy-legal-base.config.js.js';

//Non-Commercial configuration for legal docs
export default [
  ...base,
  {
    type: 'DISCLAIMER'
  },
  {
    type: 'EULA',
    template: 'EULA_NON_COMMERCIAL_TEMPLATE'
  },
  {
    type: 'PRIVACY',
    template: 'PRIVACY_NON_COMMERCIAL_TEMPLATE'
  },
  {
    type: 'SECURITY',
    template: 'SECURITY_NON_COMMERCIAL_TEMPLATE'
  }
];
