<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
    <chart-line :definition="chartLineDefinition"></chart-line>
  </div>
</template>

<script>
  import { assign } from 'lodash';

  import {
    ChartLine,
    HelloWorld,
    LocaleLabel,
    TextHeading,
  } from './components';

  export default {
    name: 'app',
    components: {
      ChartLine,
      HelloWorld,
      LocaleLabel,
      TextHeading,
    },
    data() {
      return {
        chartLineDefinition: {
          dataSource: {
            connector: {
              type: 'http',
              options: {
                url: '/data/stocks.json',
              },
            },
          },
        },
      };
    },
    mounted() {
      setTimeout(() => {
        console.log('change...');
        this.chartLineDefinition = assign({}, this.chartLineDefinition, {
          width: 1000,
        });
      }, 4000);
    },
  };
</script>
