import http from 'axios';
import { isEqual, map, merge } from 'lodash';

export default {
  name: 'ChartLine',
  props: {
    definition: {
      type: Object,
    },
  },
  data() {
    return {
      data: [],
      options: {
        height: 460,
        padding: {
          top: 20,
          right: 20,
          bottom: 30,
          left: 50,
        },
        width: 800,
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
    line() {
      return this.lineGenerator(this.data);
    },
    lineGenerator() {
      return d3.line()
        .x(d => this.scale.x(d.date))
        .y(d => this.scale.y(d.close));
    },
    padding() {
      return this.options.padding;
    },
    scale() {
      const x = d3.scaleTime().rangeRound([0, this.width]);
      const y = d3.scaleLinear().rangeRound([this.height, 0]);

      x.domain(d3.extent(this.data, d => d.date));
      y.domain(d3.extent(this.data, d => d.close));

      d3.select(this.$refs.axisX).call(d3.axisBottom(x));
      d3.select(this.$refs.axisY).call(d3.axisLeft(y));

      return {
        x,
        y,
      };
    },
    width() {
      return this.options.width - this.padding.left - this.padding.right;
    },
  },
  methods: {
    loadData() {
      console.log('load...');
      http.get(this.dataSource.connector.options.url).then((response) => {
        const source = response.data;
        this.data = map(source, n => ({
          date: this.parseTime(n.date),
          close: n.close,
        }));
      });
    },
    parseTime(value) {
      return d3.isoParse(value);
    },
    setOptions(value, previous) {
      if (value) {
        console.log('set...');
        merge(this.options, value);
        if (!previous || (previous && !isEqual(value.dataSource, previous.dataSource))) {
          this.loadData();
        }
      }
    },
  },
  watch: {
    definition: {
      handler(value, previous) {
        if (value) {
          this.setOptions(value, previous);
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.setOptions(this.definition);
  },
  render(createElement) {
    console.log('render...');
    return createElement(
      'svg',
      {
        attrs: {
          width: this.options.width,
          height: this.options.height,
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
            createElement('path', {
              attrs: {
                d: this.line,
                fill: 'none',
                stroke: 'steelblue',
                'stroke-width': 1.5,
                'stroke-linejoin': 'round',
                'stroke-linecap': 'round',
              },
            }),
          ],
        ),
      ],
    );
  },
};
