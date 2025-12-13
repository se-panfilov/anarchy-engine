import base from '../../anarchy-legal-base.config.js.js';

const baseGenerics = base.find(({ type }) => type === 'GENERIC');
const newWithoutGenerics = [...base.filter(({ type }) => type !== 'GENERIC')];

//Non-Commercial configuration for legal docs
export default [
  ...newWithoutGenerics,
  {
    ...baseGenerics,
    messages: {
      ...baseGenerics.messages,

      PRODUCT_TERM: 'Project',
      STORE_DISCLOSURES: false
    }
  },
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
