<template>
  <div>
    <div class="items"
         v-if="items">
      <div class="item"
           :key="item.id"
           v-for="item in items">
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SimpleTemplate',
    data() {
      return {
        items: [
          { id: 1, name: 'One' },
          { id: 2, name: 'Two' },
          { id: 3, name: 'Three' },
          { id: 4, name: 'Four' },
          { id: 5, name: 'Five' },
        ],
      };
    },
  };
</script>
