import { pane } from './PaneSetup';

const PARAMS = {
  factor: 123,
  title: 'hello',
  color: '#ff0055',
  percentage: 50,
  theme: 'dark'
};

pane.addBinding(PARAMS, 'factor');
pane.addBinding(PARAMS, 'title');
pane.addBinding(PARAMS, 'color');

const f = pane.addFolder({
  title: 'Title',
  expanded: true
});

f.addBinding(PARAMS, 'percentage', { min: 0, max: 100, step: 10 });
f.addBinding(PARAMS, 'theme', { options: { Dark: 'dark', Light: 'light' } });

pane.addBinding(PARAMS, 'percentage', {
  view: 'graph',
  min: 0,
  max: 100,
  readonly: true
});
