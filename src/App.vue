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
    <!-- <compiled-element></compiled-element> -->
    <!-- <div class="html-loader">
      <button @click="htmlIndex = 0">Load First</button>
      <button @click="htmlIndex = 1">Load Second</button>
      <button @click="htmlIndex = 2">Load Third</button>
      <dynamic-html-loader :template="htmlDocuments[htmlIndex]"
                           message="Dynamic">
      </dynamic-html-loader>
    </div> -->
    <!-- <element-wrapper>
      <template slot-scope="props">
        <div>{{props.message}}</div>
      </template>
    </element-wrapper> -->
  </div>
</template>

<script>
  import * as components from './components';
  // import { chartLine } from './dummy';
  // import html1 from './templates/document-1.html';
  // import html2 from './templates/document-2.html';
  // import html3 from './templates/document-3.html';

  export default {
    name: 'app',
    components,
    data() {
      return {
        // chartLineEmpty: undefined,
        // chartLine,
        // htmlDocuments: [html1, html2, html3],
        // htmlIndex: 0,
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