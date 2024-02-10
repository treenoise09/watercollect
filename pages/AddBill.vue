<template>
  <div class="flex h-dvh">
    <div class=" w-full text-black">

      <div class=" my-6 text-2xl text-center rounded-md border-sky-500">เพิ่มการใช้น้ำเดือน</div>
      <div class="  text-center mb-3">ข้อมูลการใช้น้ำย้อนหลัง
        <Icon name="ion:water" class="text-blue-500"/>
      </div>
      <div class="overflow-x-auto p-5">
        <table class="table text-center">
          <!-- head -->
          <thead>
          <tr class="text-black ">
            <th class="border border-black">เดือน</th>
            <th class="border border-black">จำนวนการใช้น้ำ (หน่วย)</th>
            <th class="border border-black">ยอดชำระ (บาท)</th>
          </tr>
          </thead>
          <tbody>
          <!-- row 1 -->
          <tr v-for="item in houseInfo.payment" :key="item.house.name" class="border border-black">
            <td class="border border-black">{{ item.date }}</td>
            <td class="border border-black">{{ item.unit }}</td>
            <td class="border border-black">{{ item.payment }}</td>
          </tr>

          </tbody>
        </table>
      </div>
      <div class="mt-3 text-center text-xl">กรอกข้อมูลปัจจุบัน</div>
      <div class="mt-3 flex justify-center items-center space-x-4 mx-2">
        <div class="text-left flex-1">เลขมิเตอร์ปัจจุบัน</div>
        <div class="flex-0">
          <input type="number" placeholder="0" v-model="formData.unit"
                 class="input input-bordered input-primary w-24 max-w-xs bg-white"/>
        </div>
        <div class="text-center flex-1">หน่วย</div>
      </div>

      <div class="mt-3 flex justify-center items-center space-x-4 mx-2">
        <div class="text-left flex-1">ราคา</div>
        <div class="flex-0">
          <input type="number" placeholder="0" v-model="formData.payment"
                 class="input input-bordered input-primary w-24 max-w-xs bg-white"/>
        </div>
        <div class="text-center flex-1">บาท</div>
      </div>


      <div class="mt-3 flex space-x-10 justify-center ">
        <div>
          <button class="btn btn-error text-white w-32 h-12 denie text-xl">ยกเลิก</button>
        </div>
        <div>
          <button @click="showModal = true" class="btn btn-success w-32 h-12 Accept text-xl">
            บันทึก
            <Icon name="mdi:content-save-outline" class="text-black text-xl"/>
          </button>
        </div>
      </div>

      <ModalComponent :isVisible="showModal" @update:isVisible="showModal = $event">
        <div class="text-center">
          <p>ทำการชำระเงินเรียบร้อยแล้ว</p>
          <div class="mt-5 flex flex-col items-center space-y-4">
            <button class="btn btn-error w-32 h-12 Accept border-0" @click="AddBill(true)">ได้รับเงินแล้ว</button>
            <button class="btn btn-error w-32 h-12" @click="AddBill(false)">ยังไม่ได้รับเงิน</button>
          </div>
        </div>

      </ModalComponent>


    </div>
  </div>
</template>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import ModalComponent from './Component/ModalComponent.vue';
import '@vuepic/vue-datepicker/dist/main.css'
import {ref, reactive} from 'vue';
import type {House} from '~/domains/types/house'
import {getHouseByHouseId} from "~/services/houseService";
import axios from "axios";
import type {RequestPaymentRecord} from "~/domains/types/requestPaymentRecord";
import {addBill} from "~/services/paymentRecordService";


const houseInfo = ref({} as House);
const route = useRoute();
const houseName = route.query.houseName;
const formData = reactive({} as RequestPaymentRecord)
onMounted(async () => {
  if (houseName) {
    try {
      houseInfo.value = await getHouseByHouseId(houseName);
      console.log(houseName)
      // Process the data as required
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});

async function AddBill(isPaid: boolean) {
  formData.paid = isPaid;
  try {
    await addBill(formData);
  } catch (error) {
    console.error(error);
  }
}

const month = ref({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

const showModal = ref(false);
</script>
<style>
.btn.Accept {
  background-color: #36F978;
}

.btn.denie {
  background-color: #FF4242;
}

/* For Chrome, Safari, Edge, and Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* For Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
