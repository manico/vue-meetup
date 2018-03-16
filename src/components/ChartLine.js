import http from 'axios';
import { isNil, map, merge, omit, values } from 'lodash';
import { chartable } from '../mixins';

export default {
  name: 'ChartLine',
  mixins: [
    chartable,
  ],
  props: {
    definition: {
      type: Object,
    },
  },
  data() {
    return {
      defaults: {
        height: 500,
        lineWidth: 1.5,
        padding: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 50,
        },
      },
    };
  },
  computed: {
    dataSource() {
      return this.options.dataSource;
    },
    chartHeight() {
      return this.options.height - this.padding.top - this.padding.bottom;
    },
    chartWidth() {
      return this.width - this.padding.left - this.padding.right;
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory10);
    },
    padding() {
      return this.options.padding;
    },
    options() {
      return merge({}, this.defaults, this.definition);
    },
    series() {
      if (isNil(this.dataSource)) {
        return null;
      }

      const fields = values(omit(this.dataSource.schema, this.timeField));

      return map(fields, n => ({
        name: n.name,
        label: n.label,
        values: map(this.data, m => ({
          time: this.parseTime(m[this.timeField]),
          serie: m[n.name],
        })),
      }));
    },
    scale() {
      this.setWidth();

      const x = d3.scaleTime().rangeRound([0, this.chartWidth]);
      const y = d3.scaleLinear().rangeRound([this.chartHeight, 0]);

      x.domain(d3.extent(this.series[0].values, d => d.time));

      y.domain([
        d3.min(this.series, c => d3.min(c.values, d => d.serie)),
        d3.max(this.series, c => d3.max(c.values, d => d.serie)),
      ]);

      this.setGrid(x, y);
      this.setAxes(x, y);

      return {
        x,
        y,
      };
    },
    timeField() {
      return this.definition.timeField;
    },
  },
  methods: {
    loadData() {
      if (this.dataSource && this.dataSource.connector) {
        http.get(this.dataSource.connector.options.url).then((response) => {
          this.data = response.data;
        });
      }
    },
    getLine(serie) {
      const generator = d3.line()
        .x(d => this.scale.x(d.time))
        .y(d => this.scale.y(d.serie));

      return generator(serie.values);
    },
    parseTime(value) {
      return d3.isoParse(value);
    },
    setWidth() {
      if (this.$refs.container) {
        this.width = this.$refs.container.clientWidth;
      }
    },
  },
  watch: {
    dataSource() {
      this.loadData();
    },
  },
  mounted() {
    this.loadData();
  },
  render(createElement) {
    const opts = this.options;

    if (isNil(this.dataSource)) {
      // TODO: Render placeholder
      console.log('placeholder');
    }

    return createElement(
      'div',
      {
        ref: 'container',
        staticStyle: {
          position: 'relative',
        },
      },
      [
        ...this.renderLegend(
          createElement,
          this.series,
          this.colorScale,
        ),
        createElement(
          'svg',
          {
            attrs: {
              width: this.width,
              height: opts.height,
            },
          },
          [
            createElement(
              'g',
              {
                attrs: {
                  transform: `translate(${this.padding.left}, ${this.padding.top})`,
                },
              },
              [
                createElement('g', {
                  ref: 'axisY',
                }),
                createElement('g', {
                  ref: 'axisX',
                  attrs: {
                    transform: `translate(0, ${this.chartHeight})`,
                  },
                }),
                createElement('g', {
                  ref: 'gridY',
                }),
                createElement('g', {
                  ref: 'gridX',
                  attrs: {
                    transform: `translate(0, ${this.chartHeight})`,
                  },
                }),
                map(this.series, serie => createElement('path', {
                  attrs: {
                    d: this.getLine(serie),
                    fill: 'none',
                    stroke: this.colorScale(serie.name),
                    'stroke-width': opts.lineWidth,
                    'stroke-linejoin': 'round',
                    'stroke-linecap': 'round',
                  },
                })),
              ],
            ),
          ],
        ),
      ],
    );
  },
};
