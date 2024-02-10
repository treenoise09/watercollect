<template>
    <div class="flex h-dvh">
      <div class="w-full">
        <!-- Search and button elements here -->
  
        <div class="m-3">
          <div v-for="house in houses" :key="house.name" @click="info(house.name)" class="m-3 p-3 border rounded-md border-sky-500">
            <p><b>ชื่อผู้ใช้น้ำ</b> {{ house.owner_name }}</p>
            <p><b>ที่อยู่</b> {{ house.address }}</p>
            <p><b>ค้างชำระ</b> - บาท</p>
            <p><b>หมายเลขมิเตอร์ประจำเดือน</b> -</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { houseselect } from '~/services/houseselectService.ts';

  const houses = ref([]);
  const router = useRouter();

  onMounted(async () => {
     try {
    const response = await houseselect();
    houses.value = response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
  
  function info(houseName:string) {
    router.push({ path: '/info', query: { houseName } });
  }
  </script>
  