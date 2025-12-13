import base from '../../anarchy-legal-base.config.js.js';

//Commercial configuration for legal docs
export default [
  ...base,
  {
    type: 'DISCLAIMER'
  },
  {
    type: 'EULA',
    template: 'EULA_COMMERCIAL_TEMPLATE'
  },
  {
    type: 'PRIVACY',
    template: 'PRIVACY_COMMERCIAL_TEMPLATE'
  },
  {
    type: 'SECURITY',
    template: 'SECURITY_COMMERCIAL_TEMPLATE'
  }
];
