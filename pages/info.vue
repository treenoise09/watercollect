<template>
  <div class="flex flex-col mx-3 h-dvh relative">
    <div class="flex flex-col sticky top-0 pt-3 bg-white">


      <div class="m-3">
        <div class="m-3 p-2 border rounded-md border-sky-500">
          <div class="text-2xl text-center font-bold">
            ข้อมูลผู้ใช้น้ำ
            <Icon name="mdi:account" class="text-blue-500" />
          </div>
          <p><b>ชื่อ-นามสกุล </b> {{ houseInfo.owner_name }}</p>
          <p><b>ที่อยู่ </b> {{ houseInfo.address }}</p>
          <p><b>หมายเลขมิเตอร์ </b>{{ houseInfo.meter_id }}</p>
          <p><b>ค้างจ่าย </b>
            <span :class="{ 'RedText': calculateOutstandingPayment(houseInfo.payment) !== 0 }">
              {{ calculateOutstandingPayment(houseInfo.payment) }}
            </span> บาท
          </p>
        </div>
      </div>
      <!-- <SpinnerModal v-if="isLoading" /> -->
      <div class="overflow-x-auto">
        <table class="table border border-black rounded-md text-center">
          <!-- head -->
          <thead class="text-blue-500 rounded-t-md">
            <tr class="border border-black">
              <th class="border border-black rounded-tl-md font-semibold">เดือน</th>
              <th class="border border-black font-semibold">หน่วยน้ำ (หน่วย)</th>
              <th class="border border-black rounded-tr-md font-semibold">ยอดชำระ (บาท)</th>
            </tr>
          </thead>
          <tbody class="rounded-b-md">
            <!-- row 1 -->
            <tr v-for="item in houseInfo.payment" :key="item.house.name" class="border border-black font-semibold">
              <td class="border border-black font-semibold">{{ formatDateToThai(item.date) }}</td>
              <td class="border border-black font-semibold">{{ item.unit }}</td>
              <td class="border border-black GreenText font-semibold">{{ item.payment }}</td>
            </tr>

          </tbody>
        </table>
      </div>
      <button class="btn btn-block mt-3 bg-green-500 text-white text-xl font-bold"
        v-if="userRole === 'Water Bill Collector' && !isEdit && currentMonthRecordExists|| isEdit && paidStatus">
        จดมิเตอร์เรียบร้อย
        <icon name="icon-park-outline:bill" />
      </button>
      <button class="btn btn-block mt-3 bg-sky-500 text-white text-xl font-bold" @click="AddBill"
        v-else-if="userRole === 'Water Bill Collector' && !isEdit">
        เพิ่มบิลการใช้น้ำ
        <icon name="icon-park-outline:bill" />
      </button>
      <button class="btn btn-block mt-3 bg-sky-500 text-white text-xl font-bold" @click="showModal = true"
        v-else-if="userRole === 'Water Bill Collector' && isEdit">
        แก้ไขบิลการใช้น้ำ
        <icon name="icon-park-outline:bill" />
      </button>
      
      <ModalComponent :isVisible="showModal" @update:isVisible="showModal = $event">
        <div class="text-center  text-2xl">
          <p>ทำการชำระเงินเรียบร้อยแล้ว</p>
          <div class="mt-5 flex flex-col items-center space-y-4">
            <button class="btn btn-error w-60 h-12 Accept border border-black" @click="putEdit(true)">ได้รับเงินแล้ว</button>
            <button class="btn btn-error w-60 h-12 border border-black" @click="putEdit(false)">ยังไม่ได้รับเงิน</button>
          </div>
        </div>

      </ModalComponent>

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { House } from '~/domains/types/house'
import ModalComponent from './Component/ModalComponent.vue';
import { getHouseByHouseId } from "~/services/houseService";
import app from '~/composables/axiosConfig';
import { computed } from 'vue';

const houseInfo = ref({} as House);
// const isLoading = ref(true);
const router = useRouter()
const route = useRoute();
const userRole = ref(localStorage.getItem("role"));
const houseName = route.query.houseName;
const isEdit = route.query.isEdit === 'true';
const currentMonthRecordExists = ref(false)
const paidStatus = ref()
const formData = reactive({
  paid: false,
  houseName: ""
});
onMounted(async () => {

  const currentMonth = new Date();
  if (houseName) {
    try {
      const response = await app.get(`/resource/Payment Record?fields=["name","date"]&filters=[["Payment Record","house","=","${houseName}"]]&order_by=date%20desc&limit_page_length=1`);
      console.log(response.data.data[0])
      const billmonth = response.data.data[0].date;
      const array = billmonth.split("-");
      const month = currentMonth.getMonth() + 1;
      if (parseInt(array[1]) == month) {
        currentMonthRecordExists.value = true;
      }
      const status = await app.get(`/resource/Payment Record?fields=["name","paid"]&filters=[["Payment Record","house","=","${houseName}"]]&order_by=date%20desc&limit_page_length=1`);
       paidStatus.value = status.data.data[0].paid;
      
      houseInfo.value = await getHouseByHouseId(houseName);
      // Process the data as required
    } catch (error) {
      console.error('Error fetching data:', error);
    }// finally {
    //   isLoading.value = false; // Set to false after data is loaded or if there's an error
    // }
  }
});
async function putEdit(isPaid: boolean) {
  let data = JSON.stringify({
    "house": houseName?.toString() || "",
    "paid": isPaid,
  });
  try {
    const response = await app.get(`/resource/Payment Record?fields=["name"]&filters=[["Payment Record","house","=","${houseName}"]]&order_by=date%20desc&limit_page_length=1`);
    const billno = response.data.data[0].name;
    console.log(billno)
    const putbill = await app.put(`resource/Payment Record/${billno}`, data)

  } catch (error) {
    console.error(error);

  }
}

function calculateOutstandingPayment(payments) {
  if (!payments) return 0;
  return payments.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.paid ? 0 : currentValue.payment);
  }, 0);
}
function AddBill() {
  router.push({ path: '/AddBill', query: { houseName } })
}
const thaiMonths = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

function formatDateToThai(dateString) {
  const date = new Date(dateString);
  const month = thaiMonths[date.getMonth()];

  return `${month}`;
}
function editBill() {

}
const showModal = ref(false);
</script>
<style>
.btn.Accept {
  background-color: #36F978;
}

.btn.denie {
  background-color: #FF4242;
}
.GreenText {
  color: #0a9b2a;
}

.RedText {
  color: #e71212
}
</style>