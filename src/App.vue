<template>
  <div id="app">
    <hello-world>Hello Meetup</hello-world>
    <!-- <locale-label>buttonAddLabel</locale-label> -->
  </div>
</template>

<script>
  import { HelloWorld, LocaleLabel } from './components';

  export default {
    name: 'app',
    components: {
      HelloWorld,
      LocaleLabel,
    },
  };
</script>
