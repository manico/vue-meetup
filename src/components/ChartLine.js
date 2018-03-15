import http from 'axios';
import { map, merge, omit, values } from 'lodash';
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
      data: [],
      defaults: {
        height: 500,
        lineWidth: 1.5,
        padding: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50,
        },
        width: 960,
      },
    };
  },
  computed: {
    dataSource() {
      return this.options.dataSource;
    },
    height() {
      return this.options.height - this.padding.top - this.padding.bottom;
    },
    padding() {
      return this.options.padding;
    },
    options() {
      return merge({}, this.defaults, this.definition);
    },
    series() {
      const fields = values(omit(this.dataSource.schema, this.timeField));

      return map(fields, n => ({
        name: n.name,
        values: map(this.data, m => ({
          time: this.parseTime(m[this.timeField]),
          serie: m[n.name],
        })),
      }));
    },
    scale() {
      const x = d3.scaleTime().rangeRound([0, this.width]);
      const y = d3.scaleLinear().rangeRound([this.height, 0]);
      const z = d3.scaleOrdinal(d3.schemeCategory10);

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
        z,
      };
    },
    timeField() {
      return this.definition.timeField;
    },
    width() {
      return this.options.width - this.padding.left - this.padding.right;
    },
  },
  methods: {
    loadData() {
      http.get(this.dataSource.connector.options.url).then((response) => {
        this.data = response.data;
      });
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

    return createElement(
      'div',
      {
        ref: 'container',
      },
      [
        createElement(
          'svg',
          {
            attrs: {
              width: opts.width,
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
                    transform: `translate(0, ${this.height})`,
                  },
                }),
                createElement('g', {
                  ref: 'gridY',
                }),
                createElement('g', {
                  ref: 'gridX',
                  attrs: {
                    transform: `translate(0, ${this.height})`,
                  },
                }),
                map(this.series, serie => createElement('path', {
                  attrs: {
                    d: this.getLine(serie),
                    fill: 'none',
                    stroke: this.scale.z(serie.name),
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
