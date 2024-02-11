<template>
  <div class="flex h-dvh">
    <div class="w-full">
      <!-- Search and button elements here -->
      <div class="m-3 p-3 flex" v-if="isShow">
        <input v-model="ownerName" type="text" placeholder="กรอกข้อมูลที่ต้องการค้นหา" class="p-2 border rounded-md border-sky-500 mr-2 bg-cyan-300 placeholder-sky-500 w-full">
        <button @click="search" class="p-2 bg-white text-white rounded-md border-sky-500 border w-1/4"><Icon name="ion:search-outline" class="text-blue-500 text-3xl" /></button>
      </div>

      <div class="m-3">
        <div v-for="house in houses" :key="house.name" @click="info(house.name)"
             class="m-3 p-3 border rounded-md border-sky-500">
          <p><b>ชื่อผู้ใช้น้ำ </b> {{ house.owner_name }}</p>
          <p>{{ house.address }}</p>
          <p><b>ค้างชำระ </b>
        <span :class="{ 'RedText': calculatePayment(house.payment) !== 0 }">
          {{ calculatePayment(house.payment) }}
        </span> บาท
      </p>
          <p><b>หมายเลขมิเตอร์ประจำเดือน </b> {{house.meter_id}}</p>
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
const route = useRoute();
const ownerName = ref("")
const isShow = ref(true)
const isEditFromQuery = route.query.isEdit === 'true';

onMounted(async () => {
  const role = localStorage.getItem("role")
  try {
    if(role === 'User'){
      isShow.value = false
      houses.value = await getHouseByUserId();
      console.log(isEdit);
    }else{
      houses.value = await getHouseByName("")
      console.log(isEdit);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
async function search() {
  houses.value = await getHouseByName(ownerName.value)
}
function calculatePayment(payments) {
  return payments.reduce((accumulator, currentValue) => accumulator + (currentValue.paid ? 0 : currentValue.payment), 0);
}
function info(houseName: string) {
  router.push({ path: '/info', query: { houseName, isEdit: isEditFromQuery } });
}

</script>
<style>
.RedText{
    color:#e71212
}
.placeholder-sky-500::placeholder {
  /* Approximate color for Tailwind's text-sky-500 */
  color: #3B82F6;
}
</style>