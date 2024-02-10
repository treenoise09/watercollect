<template>
  <div>
    view blog by id = {{ blogId }}
    
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()
console.log(route.params)

const blogId = route.params.id


</script>

<style>

</style>