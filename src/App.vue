<template>
  <div id="app">
    <!-- <hello-world>Hello Meetup</hello-world> -->
    <!-- <locale-label>buttonAddLabel</locale-label> -->
    <!-- <text-heading :level="1">Heading</text-heading> -->
  </div>
</template>

<script>
  import {
    HelloWorld,
    LocaleLabel,
    TextHeading,
  } from './components';

  export default {
    name: 'app',
    components: {
      HelloWorld,
      LocaleLabel,
      TextHeading,
    },
  };
</script>
