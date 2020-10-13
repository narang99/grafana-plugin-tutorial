import React from 'react';
import { PanelProps, GraphSeriesXY, GraphSeriesValue } from '@grafana/data';
import { Graph } from '@grafana/ui';

export interface GraphPanelOptions {
  graphType: string;
}

export const GraphPanel: React.FC<PanelProps<GraphPanelOptions>> = props => {
  let ser_ind = 0;
  const series: GraphSeriesXY[] = props.data.series.map(item => {
    const timeVals: GraphSeriesValue[] = item.fields[0].values.toArray();
    const yVals: GraphSeriesValue[] = item.fields[1].values.toArray();

    const data: GraphSeriesValue[][] = [];
    for (let i = 0; i < timeVals.length; i++) {
      data.push([timeVals[i], yVals[i]]);
    }

    const unixTimeRange = props.timeRange.to.unix() - props.timeRange.from.unix();
    const ser: GraphSeriesXY = {
      seriesIndex: ser_ind++,
      yAxis: { index: 0 },
      isVisible: true,
      timeField: props.data.series[0].fields[0],
      valueField: props.data.series[0].fields[1],
      timeStep: props.width / unixTimeRange,
      data: data,
      label: 'some label',
    };
    return ser;
  });

  const showLines = props.options.graphType === 'line';
  const showBars = props.options.graphType === 'bar';
  return (
    <div>
      <Graph
        height={props.height}
        width={props.width}
        series={series}
        timeRange={props.timeRange}
        showLines={showLines}
        showBars={showBars}
      />
    </div>
  );
};
