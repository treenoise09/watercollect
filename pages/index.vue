<template>
  <div>
    TEST API :

    <div>
      <div class="text-xl">Cat Facts : </div>
      <ul class="list-disc">
        <li v-for="fact in catFacts">{{fact.text}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
type catResult = {
  text : string,
}
let result = await useFetch<catResult[]>("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=2",{method : "get"})

let catFacts = result.data
</script>

<style></style>