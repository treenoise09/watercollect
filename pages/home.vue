<template>
    <div class="h-dvh flex justify-center items-center">
      <div class="flex flex-col space-y-2 ">
        <button @click="navigateTo('/homeselect')" class="btn btn-blue bg-cyan-100 text-black text-xl w-full">เพิ่มบิล</button>
        <button @click="navigateTo('/report')" class="btn btn-green bg-green-100 text-black text-xl w-full">ข้อมูล</button>
        <button @click="edit" class="btn btn-red bg-yellow-100 text-black text-xl w-full">แก้ไข</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const isEdit = ref(false);
  
  function navigateTo(path) {
    router.push(path);
  }
  
  function edit() {
    isEdit.value = true;
    router.push({ path: '/homeselect', query: { isEdit: isEdit.value } });
  }
  </script>
  
  