<template>
    <div class="flex flex-col mx-3 h-dvh relative">
        <div class="flex flex-col sticky top-0 pt-3 bg-white">


            <div class="m-3">
                <div class="m-3 p-2 border rounded-md border-sky-500">
                    <div class="text-2xl text-center font-bold">
                        ข้อมูลผู้ใช้น้ำ
                        <Icon name="mdi:account" class="text-blue-500" />
                    </div>
                    <p><b>ชื่อ-นามสกุล</b> {{houseInfo.owner_name}}</p>
                    <p><b>ที่อยู่</b> {{houseInfo.address}}</p>
                    <p><b>หมายเลขมิเตอร์</b>{{ houseInfo.meter_id }}</p>
                    <p><b>ยอดค้างชำระ</b>{{ houseInfo.payment?.reduce((accumulator, currentValue) => accumulator + (currentValue.paid ? 0 : currentValue.payment) ,0) }}</p>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="table border border-black rounded-md">
                    <!-- head -->
                    <thead class="text-blue-500 rounded-t-md">
                        <tr class="border border-black">
                            <th class="border border-black rounded-tl-md">เดือน</th>
                            <th class="border border-black">จำนวนการใช้น้ำ (หน่วย)</th>
                            <th class="border border-black rounded-tr-md">ยอดชำระ (บาท)</th>
                        </tr>
                    </thead>
                    <tbody class="rounded-b-md">
                        <!-- row 1 -->
                        <tr v-for="item in houseInfo.payment" :key="item.house.name" class="border border-black">
                    <td class="border border-black">{{ item.date }}</td>
                    <td class="border border-black">{{ item.unit }}</td>
                    <td class="border border-black">{{ item.payment }}</td>
                </tr>

                    </tbody>
                </table>
            </div>
            <button class="btn btn-block mt-3 bg-sky-500 text-white text-xl font-bold" @click="AddBill">เพิ่มบิลการใช้น้ำ
                <icon name="icon-park-outline:bill" />
            </button>


        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type {House} from '~/domains/types/house'
import {getHouseByHouseId} from "~/services/houseService";

const houseInfo = ref({} as House);
const router = useRouter()
const route = useRoute();
const houseName = route.query.houseName;
onMounted(async () => {
  if (houseName) {
    try {
        houseInfo.value = await getHouseByHouseId(houseName);
      // Process the data as required
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
});
function AddBill(){
    router.push({ path: '/AddBill', query:{houseName}})
}

</script>