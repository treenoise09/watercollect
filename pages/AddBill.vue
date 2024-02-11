<template>
  <div class="flex h-dvh">
    <div class=" w-full text-black">

            <div class=" my-6 text-2xl text-center rounded-md border-sky-500">เพิ่มการใช้น้ำเดือน</div>
            <div class="  text-center mb-3">ข้อมูลการใช้น้ำย้อนหลัง
                <Icon name="ion:water" class="text-blue-500" />
            </div>
            <div class="overflow-x-auto p-5">
                <table class="table text-center">
                    <!-- head -->
                    <thead>
                        <tr class="text-black ">
                            <th class="border border-black font-semibold">เดือน</th>
                            <th class="border border-black font-semibold">หน่วยน้ำ(หน่วย)</th>
                            <th class="border border-black font-semibold">ชำระ(บาท)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- row 1 -->
                        <tr v-for="item in houseInfo.payment" :key="item.house.name" class="border border-black">
                            <td class="border border-black font-semibold">{{ formatDateToThai(item.date) }}</td>
                            <td class="border border-black font-semibold">{{ item.unit }}</td>
                            <td class="border border-black GreenText font-semibold">{{ item.payment }}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div class="mt-3 text-center text-xl">กรอกข้อมูลปัจจุบัน</div>
            <div class="mt-3 flex justify-center items-center space-x-4 mx-2">
                <div class="text-left flex-1">เลขมิเตอร์ปัจจุบัน</div>
                <div class="flex-0">
                    <input type="number" placeholder="0" v-model="formData.unit"
                        class="input input-bordered input-primary w-24 max-w-xs bg-white"  @focus="clearZero('unit')"/>
                </div>
                <div class="text-center flex-1">หน่วย</div>
            </div>

            <div class="mt-3 flex justify-center items-center space-x-4 mx-2">
                <div class="text-left flex-1">ราคา</div>
                <div class="flex-0">
                    <input type="number" placeholder="0" v-model="formData.payment"
                        class="input input-bordered input-primary w-24 max-w-xs bg-white" @focus="clearZero('payment')" />
                </div>
                <div class="text-center flex-1">บาท</div>
            </div>


            <div class="mt-3 flex space-x-10 justify-center ">
                <div>
                    <button class="btn btn-error text-white w-32 h-12 denie text-xl" @click="cancel">ยกเลิก</button>
                </div>
                <div>
                    <button @click="showModal = true" class="btn btn-success w-32 h-12 Accept text-xl">
                        บันทึก
                        <Icon name="mdi:content-save-outline" class="text-black text-xl" />
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
const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
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
  formData.house = houseName?.toString()||"";
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth()+1;
  const date = currentDate.getDate();
  formData.date = `${year}-${paddingZero(month.toString())}-${paddingZero(date.toString())}`;

  try {
    await addBill(formData);
    router.push({path:'/info',query:{houseName}})
  } catch (error) {
    console.error(error);
  }
}
function paddingZero(number:string){
    if(number.length === 1){
        return "0"+ number;
    }return number
}
const thaiMonths = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน',
  'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
  'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

function formatDateToThai(dateString:string) {
  const date = new Date(dateString);
  const month = thaiMonths[date.getMonth()];

  return `${month}`;
}
function clearZero(field) {
  if (formData[field] === 0) {
    formData[field] = '';
  }
}
function cancel(){
    router.push({path:'/info',query:{houseName}})
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
.GreenText{
color: #0a9b2a;
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
