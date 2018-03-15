import { each, isNil } from 'lodash';

export default {
  methods: {
    /*
    Automatically create bottom and left axes.
    It is required for component to create axisX and axisY as refs elements.
    */
    setAxes(scaleX, scaleY) {
      const refs = this.$refs;
      if (isNil(refs.axisX) || isNil(refs.axisY)) {
        return;
      }

      d3.select(refs.axisX).call(d3.axisBottom(scaleX));
      d3.select(refs.axisY).call(d3.axisLeft(scaleY));
    },
    /*
    We are using d3-axis helper module that generates elements.
    This is why we need to use d3 selectors to select and modify elements.
    It is required for component to create gridX and gridY as refs elements.
    https://github.com/d3/d3-axis
    */
    setGrid(scaleX, scaleY) {
      const refs = this.$refs;
      if (isNil(refs.gridX) || isNil(refs.gridY)) {
        return;
      }

      const axes = {
        axisBottom: {
          element: d3.select(refs.gridX),
          scale: scaleX,
          tickSize: this.height,
        },
        axisLeft: {
          element: d3.select(refs.gridY),
          scale: scaleY,
          tickSize: this.width,
        },
      };

      each(axes, (axis, generator) => {
        axis.element
          .call(d3[generator](axis.scale).tickSize(-axis.tickSize).tickFormat(''))
          .selectAll('.tick line')
          .attr('stroke', 'lightgrey')
          .attr('stroke-opacity', 0.7)
          .attr('shape-rendering', 'crispEdges');

        axis.element
          .select('path')
          .attr('stroke-width', 0);
      });
    },
  },
};
