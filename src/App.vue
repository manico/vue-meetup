<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <hello-world-functional>Hello Meetup</hello-world-functional> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
    <!-- <chart-line :definition="chartLine"></chart-line> -->
    <!-- <simple-element>Element</simple-element> -->
    <!-- <simple-checkbox></simple-checkbox> -->
    <!-- <element-repeater></element-repeater> -->
    <!-- <test-jsx message="Hello JSX"></test-jsx> -->
    <!-- <simple-template></simple-template> -->
    <!-- <simple-template-render></simple-template-render> -->
  </div>
</template>

<script>
  import * as components from './components';
  import { chartLine } from './dummy';

  export default {
    name: 'app',
    components,
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