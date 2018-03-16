<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
    <!-- <chart-line :definition="chartLine"></chart-line> -->
    <simple-element>Element</simple-element>
  </div>
</template>

<script>
  import {
    ChartLine,
    HelloWorld,
    LocaleLabel,
    SimpleElement,
    TextHeading,
  } from './components';

  import { chartLine } from './dummy';

  export default {
    name: 'app',
    components: {
      ChartLine,
      HelloWorld,
      LocaleLabel,
      SimpleElement,
      TextHeading,
    },
    data() {
      return {
        chartLineEmpty: undefined,
        chartLine,
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