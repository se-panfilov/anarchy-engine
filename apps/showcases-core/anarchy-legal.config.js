import base from '../../anarchy-legal-base.config.js.js';

const baseGenerics = base.find(({ type }) => type === 'GENERIC');
const newWithoutGenerics = [...base.filter(({ type }) => type !== 'GENERIC')];

//Commercial configuration for legal docs
export default [
  ...newWithoutGenerics,
  {
    ...baseGenerics,
    messages: {
      ...baseGenerics.messages,

      //The brand name of the product (registered trademark)
      PRODUCT_DISPLAY_NAME: 'TBD until market release',
      SHOW_TECH_IDENTIFIERS: true,
      IS_GAME: true
    }
  },
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
