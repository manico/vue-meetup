<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
    <chart-line :definition="chartLineDefinition"></chart-line>
  </div>
</template>

<script>
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
          title: 'Stocks',
          description: 'Stocks through time',
          timeField: 'date',
          dataSource: {
            name: 'stocks',
            model: 'Stock',
            connector: {
              type: 'http',
              options: {
                url: '/data/stocks.json',
              },
            },
            schema: {
              date: {
                name: 'date',
                type: 'Date',
              },
              close: {
                name: 'close',
                type: 'Number',
              },
              closeYesterday: {
                name: 'closeYesterday',
                type: 'Number',
              },
            },
          },
        },
      };
    },
  };
</script>
