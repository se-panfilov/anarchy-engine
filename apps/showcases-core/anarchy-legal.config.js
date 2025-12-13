import base from '../../anarchy-legal-base.config.js.js';

export default [
  ...base,
  {
    type: 'DISCLAIMER',
    messages: {
      AAA: 'some AAA',
      BBB: 'some BBB',
      DDD: { date: '2024-12-31', format: 'yyyy-MM-dd' },
      NNN: { date: 'now', format: 'dd.MM.yyyy hh:mm' }
    }
  }
];
