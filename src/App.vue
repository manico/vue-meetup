<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
    <chart-line :definition="chartLineDefinition2"></chart-line>
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
        chartLineDefinition2: undefined,
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
                url: '/data/temperature.json',
              },
            },
            schema: {
              date: {
                name: 'date',
                type: 'Date',
                label: 'Date',
              },
              newYork: {
                name: 'newYork',
                type: 'Number',
                label: 'New York',
              },
              sanFrancisco: {
                name: 'sanFrancisco',
                type: 'Number',
                label: 'San Francisco',
              },
              austin: {
                name: 'austin',
                type: 'Number',
                label: 'Austin',
              },
            },
          },
        },
      };
    },
  };
</script>

<style>
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: "Roboto";
    font-size: 16px;
  }
</style>