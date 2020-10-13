import { PanelPlugin } from '@grafana/data';
import { GraphPanel, GraphPanelOptions } from './GraphPanel';

export const plugin = new PanelPlugin<GraphPanelOptions>(GraphPanel).setPanelOptions(builder => {
  return builder.addRadio({
    path: 'graphType',
    defaultValue: 'line',
    name: 'Graph Type',
    settings: {
      options: [
        {
          value: 'line',
          label: 'Line',
        },
        {
          value: 'bar',
          label: 'Bar',
        },
      ],
    },
  });
});
