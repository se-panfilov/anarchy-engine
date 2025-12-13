import { pane } from './PaneSetup';

const PARAMS = {
  factor: 123,
  title: 'hello',
  color: '#ff0055',
  percentage: 50,
  theme: 'dark'
};

pane.addInput(PARAMS, 'factor');
pane.addInput(PARAMS, 'title');
pane.addInput(PARAMS, 'color');

const f = pane.addFolder({
  title: 'Title',
  expanded: true
});

f.addInput(PARAMS, 'percentage', { min: 0, max: 100, step: 10 });
f.addInput(PARAMS, 'theme', { options: { Dark: 'dark', Light: 'light' } });

pane.addMonitor(PARAMS, 'percentage', {
  view: 'graph',
  min: 0,
  max: 100
});
