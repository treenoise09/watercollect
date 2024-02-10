<template>
  <div>
    blog index
    
    <ul>
      <li v-for="blog in blogs">
        <a :href="`/blog/${blog.id }`">{{ blog.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Blog } from '@/domains/entities/blog'

let blogs: Blog[] = [
  new Blog(1, "Hello"),
  new Blog(2, "World"),
  new Blog(3, "Human"),
]



</script>

<style></style>