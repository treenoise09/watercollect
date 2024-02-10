<template>
    <div class="h-dvh flex justify-center items-center">
      <div class="flex flex-col space-y-2">
        <button @click="navigateTo('/homeselect')" class="btn btn-blue bg-cyan-100">เพิ่มบิล</button>
        <button @click="navigateTo('/report')" class="btn btn-green bg-green-100">ข้อมูล</button>
        <button @click="navigateTo('/homeselect')" class="btn btn-red bg-yellow-100">แก้ไข</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push(route);
      }
    }
  }
  </script>
  