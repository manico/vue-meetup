import { each, isNil, map } from 'lodash';

export default {
  data() {
    return {
      data: [],
      width: 960,
    };
  },
  methods: {
    renderLegend(createElement, series, colorScale) {
      return [
        createElement(
          'div',
          {
            staticStyle: {
              position: 'absolute',
              right: 0,
              bottom: 0,
              left: 0,
              textAlign: 'center',
              fontSize: '0.875em',
            },
          },
          map(series, serie => createElement(
            'span',
            {
              staticStyle: {
                padding: '0.5em',
              },
            },
            [
              createElement('span', {
                staticStyle: {
                  color: colorScale(serie.name),
                },
                domProps: {
                  innerHTML: '&block;&nbsp;',
                },
              }),
              serie.label,
            ],
          )),
        ),
      ];
    },
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
          tickSize: this.chartHeight,
        },
        axisLeft: {
          element: d3.select(refs.gridY),
          scale: scaleY,
          tickSize: this.chartWidth,
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
    /*
    Sets the width depending on client width.
    This means that width of the component is controller by parent container.
    */
    setWidth() {
      if (this.$refs.container) {
        this.width = this.$refs.container.clientWidth;
      }
    },
  },
  /*
  Lifecycle hooks to detect window resize and resize component.
  Each component has it's own hook so we must cleanup.
  */
  beforeMount() {
    window.addEventListener('resize', this.setWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setWidth);
  },
};
