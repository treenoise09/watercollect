<template>
  <div class="flex h-dvh">
    <div class="w-full">
      <!-- Search and button elements here -->
      <div class="m-3 flex" v-if="isShow">
        <input v-model="ownerName" type="text" placeholder="Search by owner name" class="p-2 border rounded-md border-sky-500 mr-2">
        <button @click="search" class="p-2 bg-blue-500 text-white rounded-md">Search</button>
      </div>

      <div class="m-3">
        <div v-for="house in houses" :key="house.name" @click="info(house.name)"
             class="m-3 p-3 border rounded-md border-sky-500">
          <p><b>ชื่อผู้ใช้น้ำ</b> {{ house.owner_name }}</p>
          <p><b>ที่อยู่</b> {{ house.address }}</p>
          <p><b>ค้างชำระ</b>{{house.payment.reduce((accumulator, currentValue) => accumulator + currentValue.paid ? 0 : currentValue.payment ,0)}}  บาท</p>
          <p><b>หมายเลขมิเตอร์ประจำเดือน</b> {{house.meter_id}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {getHouseByUserId,getHouseByName} from '~/services/houseService';
import type {House} from "~/domains/types/house";
import getCookie from "~/utils/cookies";

const houses = ref([] as House[]);
const router = useRouter();
const ownerName = ref("")
const isShow = ref(false)

onMounted(async () => {
  const role = localStorage.getItem("role")
  try {
    if(role === 'User'){
      const userId = getCookie("user_id") ?? null
      // if(userId === null){
      //   throw new Error()
      // }
      isShow.value = true
      // houses.value = await getHouseByUserId(userId);
      houses.value = await getHouseByName("")
    }else{
      houses.value = await getHouseByName("")
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
async function search() {
  houses.value = await getHouseByName(ownerName.value)
}
function info(houseName: string) {
  router.push({path: '/info', query: {houseName}});
  
}
</script>
  